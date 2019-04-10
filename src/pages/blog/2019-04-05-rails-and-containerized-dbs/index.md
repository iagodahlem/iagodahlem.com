---
title: Rails and Containerized Databases
description: How to install ruby database gems without local database instances.
date: '2019-04-05'
tags: ['ruby', 'rails', 'docker', 'database', 'macos']
link: ''
---

When developing Rails apps, I always prefer to have my app running locally and have the database running on a Docker container instead of running everything locally or dockerizing the entire app.

It's usually tricky to set up a whole app in Docker, and doing so, make it harder to deal with dependencies, lock files, and can be very painful to debug an app running on a container.

But for databases, I found much easier to have a packaged DB in a container rather than installing a local instance on my machine, this way we keep our system clean, and we don't have local DB instances consuming our resources every time, and let's agree with something, it's pretty annoying to manage services like `sudo <service> start|stop` when you don't want to run that desired service.

Also, nowadays it's very simple to point your app to connect to a Docker container, the only problem is that some gems require native extensions to be compiled, the `pg` and `mysql2` are two of those gems, so how can we install these gems without installing local database instances?

This issue seems to very common, and there is no exact way of resolving it, the lack of possibilities found when googling it is very confusing, so I will break this down on what worked for me on a fresh install of __macOS Mojave__.

## PostgreSQL

Let's start with the `pg` gem that is the easier one, on [this post](https://michaelrigart.be/install-pg-ruby-gem-without-postgresql/) (which was the only post that I found) I discovered that the responsible interface client for PostgreSQL is the `libpq`, if you have [Homebrew](https://brew.sh/) to manage your packages (and I think you should have it), installing the `libpq` is just easy as:

```sh
$ brew install libpq
```

Now let's install the `pg` gem using the `libpq` interface:

```sh
$ gem install pg -- --with-opt-dir="/usr/local/opt/libpq"
```

Don't forget to specify the version and source if needed, the bundler output will specify that for you when you try to install it without the native extension. Now make sure everything is working just fine running `bundle install` and triggering a connection to the database.

## MySQl

The `mysql2` gem was a little bit tricky to figure out how to make it work. I found that MySQL has more than one interface library that can be used, the one that worked for was the `mysql-client`, I also tried with `mysql-connector-c` and even with `mariadb-connector-c`, but both of them raised an error when I tried to reach the DB. So let's install `mysql-client` again with Homebrew:

```sh
$ brew install mysql-client
```

And build install the `mysql2` gem, notice that this time we are passing a different option to point the native extension:

```sh
$ gem install mysql2 -- --with-mysql-config=/usr/local/opt/mysql-client/bin/mysql_config
```

Make sure everything is working again by running `bundle install` and trying to reach the database somehow. On this step, the installation worked just fine for me, but when I tried to run `rails db:create` it raised a strange error that I mentioned earlier, saying that the `_mysql_init_server` symbol was not found. After googling for a long time, I found that my system was missing some header files, which can be resolved by installing a command line SDK for macOS running:

```sh
# make sure you have xcode command line installed
xcode-select --install

# install the macOS SDK
open /Library/Developer/CommandLineTools/Packages/macOS_SDK_headers_for_macOS_10.14.pkg
```

This will open an installation window and you just need to follow the steps until completed. After that you will need to rebuild the `mysql2` gem by uninstalling it with `gem uninstall mysql2`, now just re-install doing the previous steps again.
