import { extractPanoInfo } from "./src/lib/extractPano";

async function test() {
  const url = "https://www.google.com/maps/place/Qibao+Ancient+Town/@31.1540787,121.3537687,3a,89.9y,251.44h,92.97t/data=!3m8!1e1!3m6!1sCIHM0ogKEICAgIDclcGo5QE!2e10!3e11!6shttps:%2F%2Flh3.googleusercontent.com%2Fgpms-cs-s%2FABJJf51vpbRyVQKuCFfJac8Hzn5pI4A5NBdcH4lLTJwTIzitGC9vzMtMXYVM10oLwey1IjO1J-xXSmOJ5g7i4g2WFoZQN1IW3IRI1o15riYbJoJPMfsYMQz-0OACJ8Tfuvh5MUNP6pHuyg%3Dw900-h600-k-no-pi-2.9718060023598554-ya251.4434739233753-ro0-fo100!7i5472!8i2736!4m15!1m8!3m7!1s0x35b27040b1f53c33:0x295129423c364a1!2sShanghai,+China!3b1!8m2!3d31.230416!4d121.473701!16zL20vMDZ3amY!3m5!1s0x35b261562cfa8587:0xe005fe1b3244ff6f!8m2!3d31.1540787!4d121.3537687!16s%2Fg%2F1q5bm7th2?entry=ttu&g_ep=EgoyMDI2MDYyOC4wIKXMDSoASAFQAw%3D%3D";
  const res = await extractPanoInfo(url);
  console.log(res);
}

test();
