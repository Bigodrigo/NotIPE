Estou tentando criar um Web Client para conectar com as notificações de um App!

Nesse momento adicionei o TailWind para configurar o CSS e criei uma página de Inscrição!
Nos próximos passos, preciso arrumar o formulário para criar contas no FB, a partir disso, montar o acesso dos usuários para só então conectar com o Not!!!

14/02 - Tive alguns problemas tentando fazer as conexões com o FCM, provavelmente instalei coisas desnecessárias como firebase admin e hosting, talvez tire em outro momento!
Agora estou acompanhando um vídeo bem completo da própria equipe do FB:
https://www.youtube.com/watch?v=P51dI2y7QHA

Um possível problema é o firebase deploy nos 16 min!!

23/02 - O novo código consegue enviar as mensagens escritas no input! Adicionei um Alert que pede a confirmação antes de enviar a mensagem, vou limpar o código e colocar no git!
IMPORTANTE:
Percebi alguns erros q precisam ser corrigidos, talvez por usar tsx ou copiar o exemplo!!
Tanto a matricula quanto o input estão vindo na forma de array, sendo necessário acessar matricula.matricula!!
Apesar de estar escrito Matricula, na vdd estamos consultando o uid do firebase, modificar usando o "where"!
Acessar as últimas mensagens enviadas? Para isso precisamos modificar a ordem das coisas no FB?!

24/02 - Ajuste de algumas coisas e deleção de outras! Importante dizer q o dashboard e old_index são exemplos e n deve ser deletado! Testar quais páginas podem ser retiradas...
por exemplo .firebase, out, podem ser removidas ou desinstalar pelo npm?
Para Segunda: Construir um Objeto mensagem! Pode ser no Context ou no converter, igual as tasks.... a mensagem.date é o "nome do documento" e 4 campos no objeto:
pergunta, horario, resposta null e horario null!

27/02 - Objeto criado! Vamos ajustar as informações redundantes como matricula.matricula! Tbm precisamos criar o useEffect para montar os Objetos já criados!
Formatamos a data!

28/02 - Tentar refatorar as coisas, tirar código inutil. Melhorar as mensagens para algo visual como os selects!
No signUp nós criamos um usuário/funcionário! Existe um novo banco de dados no FB para eles!! Precisamos ajustar as funções do FB, tentar usar os códigos do Joao de base!!
Boa parte do código foi limpado! Fica a sugestão de utilizar a pasta functions dentro de Firebase dentro de components para fazer o envio das mensagens e coisas do banco!

01/03 - Usar as Busca email como parâmetro para substituir nas páginas de alert, signup, login ....