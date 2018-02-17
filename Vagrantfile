Vagrant.configure(2) do |config|
  config.vm.box = "puppetlabs/ubuntu-16.04-64-puppet"
  config.vm.box_version = "1.0.0"
  config.vm.hostname = "wordpress-template-dev.box"
  config.vm.network :private_network, ip: "192.168.2.10"

  # I'll remove this later once I'm sure it's working
  # config.vm.network :private_network, ip: "172.10.0.123", :netmask => "255.255.0.0"

  config.vm.provider :virtualbox do |vb|
    vb.customize [
      "modifyvm", :id,
      "--cpuexecutioncap", "50",
      "--memory", "256",
    ]
  end

  config.vm.synced_folder "./", "/vagrant", id: "vagrant-root",
    owner: "vagrant",
    group: "www-data",
    mount_options: ["dmode=775,fmode=664"]

  config.vm.provision "shell", path: "_provision/script.sh"

  # If you have the vagrant triggers plugin installed, uncomment this to remind you of the IP on 'up'
  # config.trigger.after [:up, :resume, :reload] do
  #     info "IP: 172.10.0.36"
  # end

end
