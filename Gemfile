source "https://rubygems.org"
ruby RUBY_VERSION

gem "jekyll", "3.4.3"

require 'json'
require 'open-uri'
versions = JSON.parse(open('https://pages.github.com/versions.json').read)

gem 'github-pages', versions['github-pages']
