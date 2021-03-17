Grupo 27
Bruno Gomes nº92432
Francisco Costa nº 92461
Jõao Antunes nº 92498

Compilar e correr projeto na pasta proj_27, compilar usando make.

Ordem para correr os ficheiros: AS/FS -> PDs / Users;

Por defeito, o número máximo de clientes é 10. É possível alterar este limite no ficheiro utils.h, na constante MaxClients;

Quando o user faz o comando Remove e o PD em seguida faz o commando exit desse mesmo user, irá ocorrer um print no stdout do AS de Unregistered Failed pois os ficheiros do PD já foram removidos pelo User.
