# encoding: utf-8

require "html-proofer"

task :default => [:test]

task :test do
  options = {
    :assume_extension => true,
    :url_ignore => [
        "#_",
    ],
    :allow_hash_href => true,
    :check_html => true,
    :check_favicon => true,
    :disable_external => true
  }
  HTMLProofer.check_directory("./test", options).run
end
