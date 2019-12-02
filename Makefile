migrate: |
	cd ruksack-server; sequelize-cli db:migrate

rollback-all: |
	cd ruksack-server; sequelize-cli db:migrate:undo:all