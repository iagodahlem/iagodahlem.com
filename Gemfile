source "https://rubygems.org"
ruby RUBY_VERSION

require 'json'
require 'open-uri'
versions = JSON.parse(open('https://pages.github.com/versions.json').read)

gem "jekyll", "3.4.3"
gem 'github-pages', versions['github-pages']
gem "html-proofer"
