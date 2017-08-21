install: clean/conf.js conf.js
	npm install
	node_modules/bower/bin/bower install

reinstall: clean/conf.js start

start: install 
	node_modules/gulp/bin/gulp.js serve:dev

conf.js: conf.js.dist
	cp $< $@
ifneq ($(SOCKET_IP),) 
	$(call sed,SOCKET_IP,${SOCKET_IP},conf.js)
else
	@echo "=====" 
	@echo "SOCKET_IP not define ===> "
	@echo "1. open 'conf.js' "
	@echo "2. replace SOCKET_IP  on key 'serv' manually by 'nodemonServer' for DEV env." 
	@echo "=====" 
endif

ifneq ($(API_HOSTNAME_OR_IP),) 
	$(call sed,API_HOSTNAME_OR_IP,${API_HOSTNAME_OR_IP},conf.js)
else
	@echo "=====" 
	@echo "API_HOSTNAME_OR_IP not define ===> "
	@echo "1. open 'conf.js' "
	@echo "2. replace API_HOSTNAME_OR_IP manually by '192.168.33.10' with scotch box for backend on DEV." 
	@echo "=====" 
endif

ifneq ($(REDIRECT_SPOTIFY_IP_FQDN),) 
	$(call sed,REDIRECT_SPOTIFY_IP_FQDN,${REDIRECT_SPOTIFY_IP_FQDN},conf.js)
else
	@echo "=====" 
	@echo "REDIRECT_SPOTIFY_IP_FQDN not define ===> "
	@echo "1. open 'conf.js' "
	@echo "2. replace REDIRECT_SPOTIFY_IP_FQDN manually by 'localhost' for backend on DEV." 
	@echo "=====" 
endif

ifneq ($(REDIRECT_SPOTIFY_PORT),) 
	$(call sed,REDIRECT_SPOTIFY_PORT,${REDIRECT_SPOTIFY_PORT},conf.js)
else
	@echo "=====" 
	@echo "REDIRECT_SPOTIFY_PORT not define ===> "
	@echo "1. open 'conf.js' "
	@echo "2. replace API_HOSTNAME_OR_IP manually by '80' with scotch box for backend on DEV." 
	@echo "=====" 
endif

clean/%:
	rm -rf $*

define sed
	sed -i 's/${1}/${2}/g' $3
endef

define cleanDot
	sed -i 's/\./\\./g' $1
endef

.DEFAULT_GOAL := start

