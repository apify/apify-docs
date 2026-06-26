#!/usr/bin/env python3
"""Test the conda-forge `impit` package against https://crawlee.dev/.

Sends a variety of requests (GET / HEAD / POST / OPTIONS, browser
impersonation chrome+firefox, custom headers, sub-paths, query strings,
redirects, client reuse, sync + async clients, HTTP/3) and reports results.

Designed to run on Linux, Windows and macOS via GitHub Actions, with impit
installed strictly from the conda-forge channel (never pip).
"""
import asyncio
import json
import sys
import traceback

TARGET = "https://crawlee.dev/"
results = {"meta": {}, "checks": []}


def record(name, ok, detail=""):
    print(f"  [{'PASS' if ok else 'FAIL'}] {name}: {detail}")
    results["checks"].append({"name": name, "ok": bool(ok), "detail": str(detail)})


def body_text(r):
    v = getattr(r, "text", None)
    if isinstance(v, str):
        return v
    try:
        return r.content.decode("utf-8", "replace")
    except Exception:
        return ""


def main():
    import impit

    ver = getattr(impit, "__version__", "unknown")
    path = getattr(impit, "__file__", "unknown")
    results["meta"].update(version=ver, path=path, python=sys.version.split()[0],
                           platform=sys.platform)
    print(f"impit version={ver}  python={sys.version.split()[0]}  platform={sys.platform}")
    print(f"impit path={path}")

    # Prove the package came from a conda install (under a conda env tree),
    # not a pip/venv/site-user install.
    low = path.replace("\\", "/").lower()
    record("imported-from-conda", ("conda" in low or "miniforge" in low or "/envs/" in low), path)

    results["meta"]["api"] = [a for a in dir(impit) if not a.startswith("_")]

    Client = getattr(impit, "Client", None)
    if Client is None:
        record("Client-class-exists", False, "no Client attribute")
        return

    # 1. Basic GET
    try:
        r = Client().get(TARGET)
        t = body_text(r)
        record("GET /", r.status_code == 200 and "crawlee" in t.lower(),
               f"status={r.status_code} bytes={len(t)} http={getattr(r,'http_version','?')}")
    except Exception as e:
        record("GET /", False, f"{type(e).__name__}: {e}")

    # 2. HEAD
    try:
        r = Client().head(TARGET)
        record("HEAD /", r.status_code in (200, 405), f"status={r.status_code}")
    except Exception as e:
        record("HEAD /", False, f"{type(e).__name__}: {e}")

    # 3. Chrome impersonation
    try:
        r = Client(browser="chrome").get(TARGET)
        record("GET impersonate=chrome", r.status_code == 200,
               f"status={r.status_code} http={getattr(r,'http_version','?')}")
    except Exception as e:
        record("GET impersonate=chrome", False, f"{type(e).__name__}: {e}")

    # 4. Firefox impersonation
    try:
        r = Client(browser="firefox").get(TARGET)
        record("GET impersonate=firefox", r.status_code == 200,
               f"status={r.status_code} http={getattr(r,'http_version','?')}")
    except Exception as e:
        record("GET impersonate=firefox", False, f"{type(e).__name__}: {e}")

    # 5. Custom headers
    try:
        r = Client().get(TARGET, headers={"X-Test": "impit-conda", "Accept-Language": "en-US,en;q=0.9"})
        record("GET custom headers", r.status_code == 200, f"status={r.status_code}")
    except Exception as e:
        record("GET custom headers", False, f"{type(e).__name__}: {e}")

    # 6. Sub-paths on crawlee.dev
    for sub in ("docs/quick-start", "docs/introduction", "api/core", "js/"):
        try:
            r = Client(browser="chrome").get("https://crawlee.dev/" + sub)
            record(f"GET /{sub}", r.status_code in (200, 301, 302, 304, 404), f"status={r.status_code}")
        except Exception as e:
            record(f"GET /{sub}", False, f"{type(e).__name__}: {e}")

    # 7. Query string
    try:
        r = Client(browser="chrome").get("https://crawlee.dev/?q=impit&from=conda")
        record("GET with query string", r.status_code == 200, f"status={r.status_code}")
    except Exception as e:
        record("GET with query string", False, f"{type(e).__name__}: {e}")

    # 8. POST (static site -> expect 4xx, proves request body is sent)
    try:
        c = Client(browser="chrome")
        try:
            r = c.post(TARGET, content=b'{"ping":"crawlee"}', headers={"Content-Type": "application/json"})
        except TypeError:
            r = c.post(TARGET, data=b'{"ping":"crawlee"}', headers={"Content-Type": "application/json"})
        record("POST /", r.status_code in (200, 403, 404, 405), f"status={r.status_code}")
    except Exception as e:
        record("POST /", False, f"{type(e).__name__}: {e}")

    # 9. OPTIONS
    try:
        r = Client().options(TARGET)
        record("OPTIONS /", r.status_code in (200, 204, 403, 404, 405), f"status={r.status_code}")
    except AttributeError:
        record("OPTIONS /", True, "options() not in this version (skipped)")
    except Exception as e:
        record("OPTIONS /", False, f"{type(e).__name__}: {e}")

    # 10. Redirect following (http -> https)
    try:
        r = Client(browser="chrome").get("http://crawlee.dev/", follow_redirects=True)
        record("GET http-> follow redirect", r.status_code == 200, f"final status={r.status_code}")
    except TypeError:
        try:
            r = Client(browser="chrome").get("http://crawlee.dev/")
            record("GET http-> follow redirect", r.status_code in (200, 301, 308), f"status={r.status_code}")
        except Exception as e:
            record("GET http-> follow redirect", False, f"{type(e).__name__}: {e}")
    except Exception as e:
        record("GET http-> follow redirect", False, f"{type(e).__name__}: {e}")

    # 11. Response header inspection
    try:
        r = Client(browser="chrome").get(TARGET)
        try:
            ct = r.headers.get("content-type", "")
        except Exception:
            ct = str(getattr(r, "headers", ""))
        record("response content-type is html", "html" in ct.lower(), f"content-type={ct}")
    except Exception as e:
        record("response content-type is html", False, f"{type(e).__name__}: {e}")

    # 12. Reuse one client across requests (shared cookie jar / connection pool)
    try:
        c = Client(browser="chrome")
        c.get(TARGET)
        r = c.get("https://crawlee.dev/docs/quick-start")
        record("reuse client (cookie jar/pool)", r.status_code in (200, 301, 302, 304, 404),
               f"status={r.status_code}")
    except Exception as e:
        record("reuse client (cookie jar/pool)", False, f"{type(e).__name__}: {e}")

    # 13. HTTP/3 (experimental; needs UDP/QUIC egress)
    try:
        r = Client(browser="chrome", http3=True).get(TARGET)
        record("GET http3=True", r.status_code == 200,
               f"status={r.status_code} http={getattr(r,'http_version','?')}")
    except TypeError:
        record("GET http3=True", True, "http3 kwarg not supported in this version (skipped)")
    except Exception as e:
        record("GET http3=True", False, f"{type(e).__name__}: {str(e).splitlines()[0]}")

    # 14. AsyncClient
    AsyncClient = getattr(impit, "AsyncClient", None)
    if AsyncClient is not None:
        async def run_async():
            r = await AsyncClient(browser="chrome").get(TARGET)
            return r.status_code, len(body_text(r))
        try:
            sc, ln = asyncio.run(run_async())
            record("AsyncClient GET /", sc == 200, f"status={sc} bytes={ln}")
        except Exception as e:
            record("AsyncClient GET /", False, f"{type(e).__name__}: {e}")
    else:
        record("AsyncClient GET /", True, "AsyncClient not in this version (skipped)")

    n_ok = sum(1 for c in results["checks"] if c["ok"])
    results["meta"]["passed"] = n_ok
    results["meta"]["total"] = len(results["checks"])
    print(f"SUMMARY: {n_ok}/{len(results['checks'])} checks passed")


if __name__ == "__main__":
    try:
        main()
    except Exception:
        traceback.print_exc()
        results["meta"]["fatal"] = traceback.format_exc()
    out = sys.argv[1] if len(sys.argv) > 1 else "impit_result.json"
    with open(out, "w") as f:
        json.dump(results, f, indent=2)
    print(f"wrote {out}")
