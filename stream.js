addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  const id = getIdFromPath(url.pathname)
  if (!id) {
    return new Response('Invalid URL', { status: 400 })
  }

  const portal = "watch.push4k.xyz"
  const mac = "00:1A:79:6F:1F:36"

  const n1 = `http://${portal}/stalker_portal/server/load.php?type=stb&action=handshake&token=&JsHttpRequest=1-xml`
  const h1 = {
    "Cookie": `mac=${mac}`,
    "Referer": `http://${portal}/stalker_portal/c/`,
    "User-Agent": "Mozilla/5.0 (QtEmbedded; U; Linux; C) AppleWebKit/533.3 (KHTML, like Gecko) MAG200 stbapp ver: 2 rev: 250 Safari/533.3",
    "X-User-Agent": "Model: MAG250; Link:"
  }

  const res1 = await fetch(n1, { headers: h1 })
  const response1 = await res1.json()
  const token = response1.js.random
  const real = response1.js.token

  const h2 = {
    "Cookie": `mac=${mac}`,
    "Authorization": `Bearer ${real}`,
    "Referer": `http://${portal}/stalker_portal/c/`,
    "User-Agent": "Mozilla/5.0 (QtEmbedded; U; Linux; C) AppleWebKit/533.3 (KHTML, like Gecko) MAG200 stbapp ver: 2 rev: 250 Safari/533.3",
    "X-User-Agent": "Model: MAG250; Link:"
  }

  const n3 = `http://${portal}/stalker_portal/server/load.php?type=itv&action=create_link&cmd=ffrt%20http://localhost/ch/${id}&series=0&forced_storage=0&disable_ad=0&download=0&force_ch_link_check=0&JsHttpRequest=1-xml`
  const res3 = await fetch(n3, { headers: h2 })
  const response3 = await res3.json()
  const cmd = response3.js.cmd

  return Response.redirect(cmd, 302)
}

function getIdFromPath(path) {
  const match = path.match(/^\/(\d+)\.m3u8$/)
  return match ? match[1] : null
}
