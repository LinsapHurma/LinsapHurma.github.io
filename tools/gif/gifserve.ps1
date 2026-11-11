# Serves the frames + encoder page on :8766 and accepts PUT /out/<name>.gif into site/media
param([string]$MediaDir = (Join-Path $PSScriptRoot "..\..\media"))
$root = $PSScriptRoot
New-Item -ItemType Directory -Force $MediaDir | Out-Null
$l = [System.Net.HttpListener]::new()
$l.Prefixes.Add('http://localhost:8766/')
$l.Start()
Write-Host "gifserve on http://localhost:8766/"
$types = @{ '.html'='text/html; charset=utf-8'; '.js'='text/javascript'; '.png'='image/png'; '.json'='application/json' }
while ($l.IsListening) {
  $ctx = $l.GetContext(); $req = $ctx.Request; $res = $ctx.Response
  try {
    $path = [Uri]::UnescapeDataString($req.Url.AbsolutePath.TrimStart('/'))
    if ($req.HttpMethod -eq 'PUT' -and $path -match '^out/([a-z0-9_-]+\.gif)$') {
      $dst = Join-Path $MediaDir $Matches[1]
      $fs = [IO.File]::Create($dst); $req.InputStream.CopyTo($fs); $fs.Close()
      Write-Host "saved $dst"
      $res.StatusCode = 200
    } elseif ($path -eq 'list.json') {
      $o = @{}; Get-ChildItem (Join-Path $root 'frames') -Directory | % { $o[$_.Name] = (Get-ChildItem $_.FullName -Filter f*.png).Count }
      $b = [Text.Encoding]::UTF8.GetBytes(($o | ConvertTo-Json)); $res.ContentType = 'application/json'; $res.OutputStream.Write($b, 0, $b.Length)
    } else {
      if ($path -eq '') { $path = 'tool.html' }
      $file = [IO.Path]::GetFullPath((Join-Path $root $path))
      if ($file.StartsWith($root) -and (Test-Path $file -PathType Leaf)) {
        $b = [IO.File]::ReadAllBytes($file); $e = [IO.Path]::GetExtension($file).ToLower()
        if ($types[$e]) { $res.ContentType = $types[$e] }
        $res.OutputStream.Write($b, 0, $b.Length)
      } else { $res.StatusCode = 404 }
    }
  } catch { Write-Host "ERR $_"; $res.StatusCode = 500 }
  $res.Close()
}

