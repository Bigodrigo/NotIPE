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