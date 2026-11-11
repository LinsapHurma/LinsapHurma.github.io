# Captures a frame sequence from an EriEngine scene with scripted input (via -replay).
# Usage: capture.ps1 -Name fog -Scene Warehouse -Total 260 -Start 20 -Step 6 -Taps "V@90,V@180" -Holds "W@0-200"
param(
  [string]$Name, [string]$Scene, [int]$Total = 260, [int]$Start = 20, [int]$Step = 6,
  [string]$Taps = "", [string]$Holds = "", [string]$Extra = "", [string]$Style = "Minimized"
)
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$out = Join-Path $root "frames\$Name"
New-Item -ItemType Directory -Force $out | Out-Null

$dik = @{ V=0x2F; R=0x13; Y=0x15; T=0x14; E=0x12; F=0x21; W=0x11; A=0x1E; S=0x1F; D=0x20; Q=0x10; J=0x24; K=0x25;
          SPACE=0x39; SHIFT=0x2A; '1'=0x02; '2'=0x03; '3'=0x04; '4'=0x05; '5'=0x06 }

# Key state per frame
$keys = New-Object 'byte[][]' $Total
for ($f = 0; $f -lt $Total; $f++) { $keys[$f] = New-Object byte[] 256 }
foreach ($t in ($Taps -split ',' | Where-Object { $_ })) {
  $k, $at = $t -split '@'; $at = [int]$at
  for ($f = $at; $f -lt [Math]::Min($Total, $at + 3); $f++) { $keys[$f][$dik[$k]] = 0x80 }
}
foreach ($h in ($Holds -split ',' | Where-Object { $_ })) {
  $k, $range = $h -split '@'; $a, $b = $range -split '-'
  for ($f = [int]$a; $f -le [Math]::Min($Total - 1, [int]$b); $f++) { $keys[$f][$dik[$k]] = 0x80 }
}

# Encode ERIRPLY1 (see EriEngine/base/InputReplay.cpp)
$ms = New-Object IO.MemoryStream; $w = New-Object IO.BinaryWriter $ms
$w.Write([Text.Encoding]::ASCII.GetBytes('ERIRPLY1'))
$w.Write([uint32]1)
$sb = [Text.Encoding]::UTF8.GetBytes($Scene); $w.Write([uint32]$sb.Length); $w.Write($sb)
$w.Write([uint32]$Total)
$prev = New-Object byte[] 256
for ($f = 0; $f -lt $Total; $f++) {
  $changed = @(); for ($k = 0; $k -lt 256; $k++) { if ($keys[$f][$k] -ne $prev[$k]) { $changed += $k } }
  $flags = [byte]0; if ($changed.Count) { $flags = [byte]1 }
  $w.Write($flags); $w.Write([single](1.0 / 60.0))
  if ($changed.Count) { $w.Write([uint16]$changed.Count); foreach ($k in $changed) { $w.Write([byte]$k); $w.Write($keys[$f][$k]) } }
  $prev = $keys[$f]
}
$w.Flush()
$replay = Join-Path $out "input.replay"
[IO.File]::WriteAllBytes($replay, $ms.ToArray())

$exe = 'L:\EriEngine\Generated\Outputs\Development\EriEngineSandbox.exe'
$i = 0
for ($fr = $Start; $fr -lt $Total; $fr += $Step) {
  $png = Join-Path $out ("f{0:D3}.png" -f $i)
  if (-not (Test-Path $png)) {
    $args = "-scene $Scene -replay `"$replay`" -noimgui -fixedstep -capture `"$png`" -captureframe $fr $Extra"
    $p = Start-Process -FilePath $exe -ArgumentList $args -WorkingDirectory 'L:\EriEngine\EriEngineSandbox' -WindowStyle $Style -Wait -PassThru
    if (-not (Test-Path $png)) { Write-Host "[$Name] frame $fr FAILED (exit $($p.ExitCode))" }
  }
  $i++
}
Write-Host "[$Name] done: $i frames"
