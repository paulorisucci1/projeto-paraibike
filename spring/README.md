* Dê um "mvn clean compile" no diretório root do projeto proto e depois no diretório do projeto root da aplicação
* Quando for rodar a aplicação, rode o grpc-service
* Ferramentas necessárias: java 17, maven, postgres (a aplicação tá usando a base de dados padrão do postgres)
* O GRPC está definido dentro do projeto "proto", no arquivo src/main/proto/schema.proto
* O client-service é uma aplicação feita para testar o consumo do service GRPC em Java (ele possui controllers para receber requisições HTTP, e as repassa para os métodos RPCs executarem a lógica de negócio.
