# WebProxy

- Build and start all containers
```bash
docker compose up -d --build
```

- Check container logs
```bash
docker compose logs -f
```

- Check webproxycrud-instance logs
```bash
docker logs -f webproxycrud-instance{nr}
```

- Stop containers
```bash
docker compose stop
```

- Start containers
```bash
docker compose start
```

- Remove containers
```bash
docker compose down
```

Accessing the app:

http://localhost -> load balanced access

http://localhost:3001 -> instance1
http://localhost:3002 -> instance1
http://localhost:3003 -> instance1
