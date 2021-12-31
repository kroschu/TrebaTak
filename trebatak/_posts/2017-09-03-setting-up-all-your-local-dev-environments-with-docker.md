---
layout: post
title: Setting up all your local dev environments with Docker
---

Recently I've been using Docker for about almost everything, because it's so neat at compartmentalising messy dependencies, build environments, and so on. This is especially true if you're like me, who works on concurrent projects at the same time. Or even worse, if you have to use different versions of PHP or MySQL for example, for different projects.

Traditionally, on my Macbook, I would use Homebrew for installing a local nginx server, a shared MySQL instance containing all my projects' databases, as well as a PHP 7.1 runtime. But as I started experimenting and dabbling into more languages and runtimes, along with various work requirements, it started to get a bit painful to maintain separate runtimes and separate versions on your computer, and have to set up the same environment if I move to another computer (which I haven't done so recently, thankfully).

I typically work on web development projects, some of which require running a local server exposed on a certain TCP port (such as `localhost:3000`). When you have to deal with many of such projects concurrently, it starts to get a bit of a pain to remember which ports are taken, debug stupid errors where your app can't connect because you changed the port, and so on.

Additionally, if you run a UI application using `webpack-dev-server` on say `localhost:3000`, and an API server on `localhost:3001`, the UI dev server running on `localhost:3000` cannot communicate with `localhost:3001` on modern browsers (such as Chrome) without running into Cross-Origin Resource Sharing (CORS) errors. How I normally get around this would be to set up a virtual host route on my local nginx server, reverse proxy `my-project.local` to `localhost:3000` and `myproject.local/api` to `localhost:3001`, and reference the API via `http://my-project.local/api` instead.

This called for a rather lot of work each time I required to create a new project with both frontend and backend parts, and I wanted to see how this can be done away with.

_TL;DR: The scripts used in this post, along with a sample project using Docker can be found on GitHub: [`docker-local-dev-env`](https://github.com/irvinlim/docker-local-dev-env). Do give it a star if it has helped you! :)_

---

## Dockerize everything!

Once I properly picked up Docker in May this year, I found myself Dockerizing (almost) everything - from production deployments to development environments as well. I even went so far as to do `brew uninstall nginx` and `brew uninstall mysql` on my machine, migrating the local development environment for most of my existing projects (that I still care about) to Docker.

How this works is that each project expects to have some dependencies, be it WordPress which expects `php` and `mysql`, or a Jekyll project which expects `ruby` and `jekyll`. 

For example, let's talk about a Laravel project, which requires the following: `php`, `mysql`, `redis`. I decided to go ahead with [`richarvey/nginx-php-fpm`](https://hub.docker.com/r/richarvey/nginx-php-fpm/) as I have always used that image for PHP development, and it exposes the application through a port.

To migrate an existing project, I added a `dev/` directory which may look like the following:

```
dev/
|-- conf/
|   +-- nginx/
|       +-- nginx-site.conf
|-- .gitignore
|-- docker-compose.yml
+-- docker-compose.override.yml
```

The `nginx-site.conf` is actually specific to `richarvey/nginx-php-fpm`, as the image allows you to provide a custom `.conf` file to serve the PHP application, and actually all you really need is just your `docker-compose.yml` file.

### Docker Compose

For my Laravel project, there were three images and hence three containers that had to talk to each other, and thus it makes sense to use Compose for this.

A simple `docker-compose.yml` file can look like this:

```yml
version: '3'

services:
  php-nginx:
    image: richarvey/nginx-php-fpm
    environment:
      WEBROOT: /var/www/html/public/
    volumes:
      - ../:/var/www/html
      - ./conf/nginx:/var/www/html/conf/nginx
  mysql:
    image: mysql
    environment:
      MYSQL_DATABASE: homestead
      MYSQL_USER: homestead
      MYSQL_PASSWORD: secret
      MYSQL_ROOT_PASSWORD: password
  redis:
    image: redis
```

What this does is to allow you to immediately have 3 running containers when you do this:

```
docker-compose up -d
```

Your Laravel application can simply connect to `mysql:3306` instead of `localhost:3306`, and connect to Redis using `redis:6379` instead of `localhost:6379`. You should be committing `docker-compose.yml` to the repo.

You can then use the `docker-compose.override.yml` file for your own personal overrides - don't commit this! You should hence be adding this to your `.gitignore`. You can do something like this:

```yml
version: '3'
services:
  php-nginx:
    ports:
      - 3000:80
```

Since every developer on the project is not guaranteed to have port `3000` available, you should be putting port bindings to host strictly within the `docker-compose.override.yml` file. This will require the developer to explicitly bind the port, or to use a managed service to do this for us.

## Setting up virtual hosts with `nginx-proxy`

What we managed to do so far with Docker Compose is to containerize the three required programs for our Laravel application, and it should be running smoothly. However, we haven't yet solved the problem with having to manually setting ports ourselves, which turns out to be slightly more than just a minor annoyance if you have to do it every day.

Thankfully, [`nginx-proxy`](https://github.com/jwilder/nginx-proxy) exists, which is an _"automated nginx reverse proxy for Docker"_. We will be using it to reverse proxy any requests made to a local domain to the Docker container's port 80 (by default) using nginx, which will automatically reload once a new Docker container is started or stopped. This means that we can access our application at `http://my-project.local` for example, immediately when we do `docker-compose up -d`!

### Setting up

Following the setup instructions, we do:

```
docker run -d -p 80:80 -v /var/run/docker.sock:/tmp/docker.sock:ro --restart always --name nginx-proxy jwilder/nginx-proxy
```

This creates a container called `nginx-proxy` bound to `localhost:80`, and is ready to accept reverse proxy requests.

### Linking projects to `nginx-proxy`

Here's where we can effectively make use of `docker-compose.override.yml` in our project. According to the documentation for `nginx-proxy`, "the request will be routed to a container with the `VIRTUAL_HOST` env var set". 

First, we have to create a Docker network called `nginx-proxy` and add the container (with the same name) to it:

```
docker network create nginx-proxy
docker network connect nginx-proxy nginx-proxy
```

Next, we should modify our `docker-compose.override.yml` file to look something more like this now:

```yml
version: '3'

services:
  php-nginx:
    environment:
      VIRTUAL_HOST: my-project.local
    networks:
      - default
      - nginx-proxy

networks:
  nginx-proxy:
    external:
      name: nginx-proxy
```

Ensure that you have added `my-project.local` to your `/etc/hosts` file, then restart the containers by doing `docker-compose up -d` again, and there we have it! A perfectly reverse proxied Docker container.

Note that both `default` and `nginx-proxy` are required under `networks`, which gives rise to 2 network interfaces within the `php-nginx` container - `default` to communicate with the other containers in the same Compose network (`mysql` and `redis`), as well as `nginx-proxy` to communicate with, well, `nginx-proxy` itself.

### Test it!

Try starting and stopping the containers as follows:

```shell
# Stop the containers
docker-compose stop

# Start the containers
docker-compose start
```

The change should be almost immediate once the containers are running and the actual `nginx` processes within the containers have started to listen on port `80`.

## Other Global Tools

Now that we have an automated reverse proxy that automatically proxies our web applications to a `.local` domain for our development environment, it may help to add some other tools globally that will be useful for frequent web development.

### phpMyAdmin

Who can forget the wonderful phpMyAdmin? It still remains my favourite interface when managing a database, and definitely beats MySQL Workbench hands down. Sequel Pro comes in at a close second, and is efficient when you need to connect to databases through a SSH tunnel (which might be more painful when using phpMyAdmin, on Docker).

{% include image.html src="phpmyadmin.png" caption="The classic, well-loved phpMyAdmin" %}

Simply run the image like this:

```
docker run -d \
        --name phpmyadmin \
        --restart always \
        -e VIRTUAL_HOST=pma.local \
        -e PMA_ARBITRARY=1 \
        -e PMA_ABSOLUTE_URI=http://pma.local \
        phpmyadmin/phpmyadmin
docker network connect nginx-proxy phpmyadmin
```

Next, to access our databases in our project from this "globally-installed" phpMyAdmin, both containers must be within the same network. Create and connect the image to a new network as follows:

```
docker network create phpmyadmin
docker network connect phpmyadmin phpmyadmin
```

Finally, modify your `docker-compose.override.yml` file to add the `phpmyadmin` external network:

```yml
services:
  mysql:
    networks:
      - default
      - phpmyadmin

networks:
  phpmyadmin:
    external:
      name: phpmyadmin
```

Reload the container and open up `http://pma.local` on your browser. You'll need to enter the exact IP address or hostname of the database, which should be similar to one of the following:

- `mysql`: May conflict if you have other projects with a container called `mysql` as well.
- `dev_mysql_0`: The name depends on the parent folder of the `docker-compose.yml` file, as well as the index.
- The actual IP address, find it using `docker inspect dev_mysql_0 | grep 172.`

### Portainer

Using Docker may be a bit of a pain to manage entirely through CLI. Though Kitematic exists, the "official" UI for Docker, I find that [Portainer](https://portainer.io/) is a better replacement.

{% include image.html src="portainer.png" caption="Wonderful!" %}

The setup for Portainer is pretty similar to that of phpMyAdmin, sans the additional network setup part.

## Wrapping it all up

In this post, I outlined a relatively detailed step-by-step guide to set up your own local development environment for all your projects using Docker, which has scaled well for me so far. At the same time, we ensured that your own local development environment does not conflict with the local environments for other developers on the same project, by strictly separating all host-specific configuration into `docker-compose.override.yml`, which is not committed to source control. This means that one developer can set up his or her dev environment using Docker Compose, and all other developers on the same project can benefit from the `docker-compose.yml` file, and yet have the flexibility as to whether to bind ports explicitly to the host, or to use something like `nginx-proxy` as we have outlined here.

I have also wrapped the scripts for setting up `nginx-proxy`, `portainer` and `phpmyadmin` into their own Bash scripts, which you can find on this [GitHub repo](https://github.com/irvinlim/docker-local-dev-env). Do give it a star GitHub if it has helped you!

This workflow has worked pretty well for me so far, and I'm sharing this in the hope others will find this to be a useful to start automating their own local development environments!
