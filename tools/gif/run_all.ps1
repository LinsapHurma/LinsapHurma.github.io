# Runs all capture jobs, 3 at a time
$g = Split-Path -Parent $MyInvocation.MyCommand.Path
$jobs = @(
  @{ Name='fog';       Scene='Warehouse';  Total=300; Start=30; Step=6;  Taps='V@120,V@220' },
  @{ Name='ssr';       Scene='Warehouse';  Total=300; Start=30; Step=6;  Taps='R@120,R@220' },
  @{ Name='retro';     Scene='RetroCat';   Total=270; Start=30; Step=6;  Taps='' },
  @{ Name='mood';      Scene='Hd2dTown';   Total=620; Start=30; Step=10; Taps='2@60,3@230,4@400' },
  @{ Name='painterly'; Scene='Painterly';  Total=330; Start=30; Step=6;  Taps='2@130,2@240' },
  @{ Name='style';     Scene='CombatDemo'; Total=360; Start=30; Step=6;  Taps='Y@130,Y@250'; Extra='-autoplay' },
  @{ Name='combat';    Scene='CombatDemo'; Total=500; Start=40; Step=6;  Taps=''; Extra='-autoplay' },
  @{ Name='water';     Scene='Water';      Total=500; Start=30; Step=8;  Taps='2@170,3@330' },
  @{ Name='colossus';  Scene='Colossus';   Total=440; Start=30; Step=7;  Taps=''; Holds='W@20-430' }
)
$running = @()
foreach ($j in $jobs) {
  while (@($running | Where-Object { $_.State -eq 'Running' }).Count -ge 3) { Start-Sleep -Seconds 2 }
  $running += Start-Job -ArgumentList $g, $j -ScriptBlock {
    param($g, $j)
    & "$g\capture.ps1" -Name $j.Name -Scene $j.Scene -Total $j.Total -Start $j.Start -Step $j.Step -Taps $j.Taps -Holds "$($j.Holds)" -Extra "$($j.Extra)"
  }
}
$running | Wait-Job | Receive-Job
Write-Host "ALL DONE"
