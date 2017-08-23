install: | conf.js
	npm install
	node_modules/bower/bin/bower install

full-reinstall: clean/node_modules reinstall

reinstall: clean/conf.js start

reinstall-mac: install-mac

install-mac: 
ifneq ("$(wildcard conf.js)","")
else
	cp conf.js.dist conf.js
endif
	npm install
	node_modules/bower/bin/bower install


start: install 
	node_modules/gulp/bin/gulp.js serve:dev

start-mac: install-mac 
	node_modules/gulp/bin/gulp.js serve:dev

start-only: 
	node_modules/gulp/bin/gulp.js serve:dev

conf.js: | conf.js.dist
	echo " == Config =="
ifneq ($(SOCKET_IP),) 
ifneq ($(API_HOSTNAME_OR_IP),) 
ifneq ($(REDIRECT_SPOTIFY_IP_FQDN),) 
ifneq ($(REDIRECT_SPOTIFY_PORT),)
	cp $(word 1,$|) $@
	$(call sed,SOCKET_IP,${SOCKET_IP},$@)
	$(call sed,API_HOSTNAME_OR_IP,${API_HOSTNAME_OR_IP},$@)
	$(call sed,REDIRECT_SPOTIFY_IP_FQDN,${REDIRECT_SPOTIFY_IP_FQDN},$@)
	$(call sed,REDIRECT_SPOTIFY_PORT,${REDIRECT_SPOTIFY_PORT},$@)
else
	$(error "REDIRECT_SPOTIFY_PORT not define ===> ")
endif
else
	$(error "REDIRECT_SPOTIFY_IP_FQDN not define ===> ")
endif
else
	$(error "API_HOSTNAME_OR_IP not define ===> ")
endif
else
	$(error "SOCKET_IP not define ===> ")
endif

clean/%:
	rm -rf $*

conf.js.dist:
	$(error "File $@ exist, it's on github !")

define sed
	sed -i 's/${1}/${2}/g' $3
endef

.DEFAULT_GOAL := start

