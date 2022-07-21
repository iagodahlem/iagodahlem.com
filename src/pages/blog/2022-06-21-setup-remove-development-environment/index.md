---
title: Setup Remote Development Environment
description: ''
date: '2022-06-21'
tags: ['devops', 'linux', 'ubuntu']
---

Today I want to show you how to setup a remote development environment and tools that you can use to make your life easier when maintining such environments.

We will be using Ubuntu Server as the base distro for all the examples and commands we will be showing, but you can mostly adapt all the commands and installations to your distro of preference. It's also assumed that you know how to install a operational system from scratch, so this will not be covered on this post.

Before we start, let's mitigate what actually is a remote development enviroment, what hardware or cloud providers you can use and the benefits and downsides that come with it.

## What is a remote development environment?

Have you ever struggled to fire up some services in your local machine alongside with all the apps you need to have open to get your work done? Yeah, I've been there already. Lately, developers have seem theirselves needing everytime more powerful machines to work on their projects, with the adoption of microservices, Docker containers, we have a lot more services and apps to run, in order to have a functional local environment.

One way to get around this problem, is moving all your development environment to a different machine or server. It can be on a separate machine on your local network, or a VPS on a cloud provider. With that you don't have to consume all the resources of your local machine firing up all those services to work on what you need, keeping your local as clean and smooth as possible.

You can think of WSL for a comparison, with WSL you are running a linux subsystem inside your Windows, it is a separate operational system just the same, but you are still sharing the resources of your main system, in the case of a remote environment, you are literally separating the machines into two or even more separate ones.

### Benefits and Downsides

Let's cover the benefits, as I already mentioned, you don't have to use all the resources of your machine running services or time-consuming tasks, which also keeps your system clean from installing language runtimers, databases, compilers, and so on. You also get the better of both worlds, you can work from any operational system you want, and develop on a Linux system, which to me, it's the best operational system for development. You can develop from anywhere you want, even from a mobile device like an iPad or Android. And even rapidly expose a localhost on your server to demonstrate or share something you are working on.

But of course, not everything is perfect, just by having a separate machine you have a lot more to mantain to keep your both systems running, as well as a bit more of complexity and configuration to access one machine from another or to expose the services you are working on. If you choose to host a machine yourself in your local network, there are a couple of things to consider too, in order to expose it from outside your network, but we will cover that in the next topics. It also adds a lot of reliability on a network, so if your internet drops, you won't be able to access your server or your local machine.

If that is not a problem to you and it doesn't sound like a pain to maintain your machines, I think you can benefit from this setup.

### Local Hardware or Cloud Hosts?

## Let's Set it Up

### Accessing your server with SSH

So, first before you connect to your server, be it a local or on a cloud provider, you have to have installed on your client and server the OpenSSH package, usually on cloud providers and Server distributions, that already comes pre-installed, but in case you don't have it, here's the command to install it:

```sh
sudo apt install openssh-server
```

TODO: restart systemctl

Now, how do get into the server using SSH? First we need to know the server's IP address, if you are using a cloud provider, this is easily findable from a dashboard where you create the VPS, if it's a local machine in your network, there are lots of different commands to list your address, here are some:

- `ifconfig -a`
- `ip addr (ip a)`
- `hostname -I | awk '{print $1}'`
