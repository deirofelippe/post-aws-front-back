# AWS Frontend e Backend 

Será usado o S3 para hospedar o frontend, EC2 para hospedar o backend em nodejs e RDS para banco de dados MySQL.

## Rodar aplicação localmente

- Rode para configurar tudo e iniciar o docker: `make dk-init-config`
- PHP My Admin: `localhost:8888`
- Backend: `localhost:8000`
- Curl para criar usuário: `make curl-create`
- Curl para fazer login: `make curl-login`

## RDS

clique em Create Database
selecione o 'Easy create' em database creation method
seleciona o 'MySQL' em 'Engine type'
selecione o 'Free tier' em 'DB instance size'
coloque o nome do identificador do banco de dados, username e senha
por fim clique em 'Create database'

configurar a porta e o acesso em security groups

pode acessar o banco pra criar tabelas usando o phpmyadmin ou mysql cli, ambos pelo docker

## EC2

seleciona o SO Ubuntu
seleciona a versão do Ubuntu no free tier (atualmente o Ubuntu Server 22.04 LTS ou 20.04 LTS)
seleciona o tipo de instance do free tier (atualmente o t2.micro)
crie o key pair e de um nome para ele, será usado para acessar o EC2 via SSH
clique em 'Launch Instance'
clique em 'View all instances'
selecione a instancia criada
será exibido o 'Public IPv4 address' que é por onde será acessado a aplicação
vá em 'Security' e em 'Security groups', clique no link
clique em 'Edit inbound rules' e 'Add rule'
escolha 'Custom TCP' em 'Type', '8000' em 'Port range' e 'Anywhere-IPv4' em 'Source'
clique em save rules
vá em todas as intancias do EC2, selecione a sua e clique em 'Connect'
vá na aba 'SSH client'
copie o comando de exemplo do SSH
vá no arquivo .pem que foi gerado, mude suas permissões com 'chmod 400 teste.pem'
vá no terminal e rode o comando SSH copiado
dentro da instancia rode o comando 'sudo apt-get update -y && sudo apt-get upgrade -y'
jogue o seu código dentro da instancia, pode ser usando o git, caso seja, instale o git com 'sudo apt install git'
instale o asdf que irá dar a possibilidade de você instalar a maioria das linguagens de programação
vá na documentação e siga os passos de instalação e configuração do bashrc
depois rode
    asdf plugin add nodejs
    asdf list all nodejs (listar todas as versões possíveis para baixar)
    asdf install nodejs 19.9.0
    asdf global nodejs 19.9.0 (configura a versão global, de qualquer diretório)
    asdf local nodejs 19.9.0 (configura a versão para um diretório)
    asdf list (listar os plugins e versões baixadas)

configurar a porta e o acesso

npm install -g pm2
pm2 start index.js --name=app
pm2 list
pm2 delete app

## S3

escolha o nome do bucket
escolha a regiao sa-east-1
habilite a ACL
desabilite o 'Block all public access' e habilite a mensagem do triangulo vermelho
clique no bucker criado e faça o upload dos arquivos
vá em properties e clique em 'Static website hosting'
    habilite
    digite qual é o 'Index document'
    salve as alteracoes
selecione Permissione e depois Bucket policy
    cole o json
    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Sid": "PublicReadGetObject",
                "Principal": "*",
                "Effect": "Allow",
                "Action": [
                    "s3:GetObject"
                ],
                "Resource": [
                    "arn:aws:s3:::trabalho-s3/*"
                ]
            }
        ]
    }
em 'Static website hosting' vai aparece o link do site

## CUSTOS


Laboratório de aprendizagem

Visão geral do ambiente
Navegação pelo ambiente 
Acessar o Console de Gerenciamento da AWS
Restrição de regiões 
Uso do serviço e outras restrições 
Usar o terminal no navegador 
Executar os comandos da AWS CLI 
Usar o AWS SDK for Python 
Preservar seu orçamento 
Acessar instâncias do EC2 
Acesso por SSH a instâncias do EC2 
Acesso por SSH pelo Windows
Acesso por SSH pelo Mac

 
Visão geral do ambiente

Este laboratório de aprendizagem oferece um ambiente de sandbox para a exploração específica de serviços da AWS.

Este ambiente é de longa duração. Quando o cronograma da sessão for zerado, a sessão terminará, mas todos os dados e os recursos criados na conta da AWS serão retidos. Se você iniciar uma nova sessão (por exemplo, no dia seguinte), descobrirá que seu trabalho ainda está no ambiente de laboratório. 

As instâncias do EC2 em execução serão interrompidas e, depois, serão reiniciadas automaticamente da próxima vez que você iniciar uma sessão. As instâncias do bloco de notas do SageMaker serão interrompidas, mas não serão reiniciadas da próxima vez que você iniciar uma sessão. 

 IMPORTANTE: monitore seu orçamento de laboratório na interface de laboratório acima. Sempre que você tiver uma sessão de laboratório ativa, as informações mais recentes conhecidas do orçamento restante serão exibidas na parte superior desta tela. Esses dados são provenientes do AWS Budgets, que, geralmente, são atualizados a cada oito a doze horas. Dessa forma, o orçamento restante observado pode não refletir a atividade mais recente de sua conta.  Se você exceder seu orçamento de laboratório, sua conta será desativada e todo o andamento e os recursos serão perdidos. Assim sendo, é importante gerenciar suas despesas. Leia sobre como preservar seu orçamento.

 
Navegação pelo ambiente

Use o link  Readme (Leiame) acima para voltar a estas instruções a qualquer momento.

Use o link  AWS Details (Detalhes da AWS) acima para acessar informações sobre seu ambiente.

Depois de iniciar o laboratório, o painel AWS Details (Detalhes da AWS) será exibido, e você precisará selecionar Readme (Leiame) para voltar a estas instruções.

 Dica: você pode redimensionar esse painel a qualquer momento arrastando a barra para a esquerda destas instruções para estreitá-la ou aumentá-la.

Use o link  Reset (Redefinir) acima se quiser restaurar sua conta da AWS para as configurações que você usava antes de executar sessões deste ambiente de laboratório.  Essa opção não redefinirá seu orçamento.  CUIDADO: se optar por redefinir e, depois, selecionar Yes (Sim) para confirmar que não deseja redefinir, você vai excluir permanentemente tudo o que criou ou armazenou na conta da AWS.

A janela de terminal à esquerda destas instruções pode ser usada para executar os comandos da AWS CLI ou código, por exemplo, do AWS SDK for Python (detalhes fornecidos abaixo).

 
Acessar o Console de Gerenciamento da AWS

    Na parte superior destas instruções, selecione 
      Start Lab (Iniciar laboratório) para iniciar a sessão do laboratório.

        A sessão de laboratório é iniciada, e as informações da sessão são exibidas.

        Um cronograma acima mostra o tempo restante da sessão.

         Dica: você pode atualizar a duração da sessão a qualquer momento selecionando Start Lab (Iniciar laboratório) novamente antes que o cronômetro seja zerado.

    Selecione o  link Readme (Leiame) para voltar para estas instruções.

    Conecte-se ao Console de Gerenciamento da AWS clicando no link da AWS acima da janela do terminal.

        Você precisa estar conectado ao Console de Gerenciamento da AWS.

        Dica: se uma nova guia não for aberta, você verá um banner ou um ícone na parte superior do navegador com uma mensagem informando que o programa está impedindo que o site abra janelas pop-up. Clique no banner ou no ícone e escolha Allow pop-ups (Permitir pop-ups).

         Dica: se você tiver interesse em interagir com a conta da AWS de forma programática, leia a seção Configurar e usar o terminal no navegador abaixo para obter detalhes.

Restrição de regiões

O acesso ao serviço é limitado às Regiões us-east-1 e us-west-2, a menos que mencionado de outra forma nos detalhes do serviço abaixo. Se você carregar uma página de console do serviço em outra Região AWS, verá mensagens de erro de acesso.

 
Uso do serviço e outras restrições

Os serviços a seguir podem ser usados. Limitações específicas são aplicáveis conforme documentado.  Restrições de serviços estão sujeitas a alterações.
Gateway de API da Amazon

    Esse serviço pode assumir o perfil do IAM LabRole.

AWS App Mesh
Application Auto Scaling

    Esse serviço pode assumir o perfil do IAM LabRole.

AWS AppSync
Amazon Athena

    Esse serviço pode assumir o perfil do IAM LabRole.

Amazon Aurora
AWS Backup
AWS Batch

    Esse serviço pode assumir o perfil do IAM LabRole.

AWS Budgets
AWS Certificate Manager (ACM)
AWS Cloud9

    Esse serviço pode assumir o perfil do IAM LabRole.
    Tipos de instância compatíveis: nano, micro, small, medium, large e c4.xlarge.

AWS CloudFormation

    Esse serviço pode assumir o perfil do IAM LabRole.

Amazon CloudFront

    Esse serviço pode assumir o perfil do IAM LabRole.

Amazon CloudSearch
AWS CloudShell
AWS CloudTrail

    Esse serviço pode assumir o perfil do IAM LabRole.

Amazon CloudWatch
AWS CodeCommit

    Esse serviço pode assumir o perfil do IAM LabRole.

AWS CodeDeploy

    Esse serviço pode assumir o perfil do IAM LabRole.

Amazon Comprehend

    Esse serviço pode assumir o perfil do IAM LabRole.

AWS Config
AWS relatório de uso e custo
AWS Cost Explorer
AWS Data Pipeline

    Esse serviço pode assumir o perfil do IAM LabRole.

AWS DeepComposer
AWS DeepLens
AWS DeepRacer

    Esse serviço pode assumir o perfil do IAM LabRole.

AWS Directory Service
Amazon DynamoDB

    Esse serviço pode assumir o perfil do IAM LabRole.

Amazon EC2 Auto Scaling

    Esse serviço pode assumir o perfil do IAM LabRole.
    Tipos de instância compatíveis: nano, micro, small, medium e large.
    Leia as especificações Limites de instâncias em execução simultânea documentadas nos detalhes do serviço do EC2 abaixo para tomar conhecimento de restrições adicionais.
    Recomendação: defina sua necessidade real para evitar o uso acima de seu orçamento de custo.

AWS Elastic Beanstalk

    Esse serviço pode assumir o perfil do IAM LabRole.
    Para criar um aplicativo: selecione Create Application (Criar aplicativo), fornece um nome a ele, selecione uma plataforma e, depois, selecione Configure more options (Configurar mais opções). Role para baixo até acessar o painel Security (Segurança) e selecione Edit (Editar). Para Service role (Perfil de serviço), selecione LabRole. Se o ambiente estiver na Região AWS us-east-1, para o par de chaves do EC2, selecione vockey e, para IAM instance profile (Perfil de instância do IAM), selecione LabInstanceProfile. Selecione Save (Salvar) e, depois, Create app (Criar aplicativo).
    Tipos de instância compatíveis: nano, micro, small, medium e large. Se você tentar iniciar um tipo de instância maior, ela será terminada.

Amazon Elastic Block Store (EBS)

    O tamanho máximo do volume é de 100 GB
    O PIOPs não é compatível

Amazon Elastic Compute Cloud (EC2)

    Esse serviço pode assumir o perfil do IAM LabRole.

    AMIs compatíveis: 
        AMIs disponíveis em us-east-1 ou us-west-2. Por exemplo, AMIs do Quick Start, Minhas AMIs e AMIs de comunidade. 
        AMIs do AWS Marketplace não são compatíveis. AMIs, como MacOS, que precisam ser iniciadas como uma instância dedicada ou em um host dedicado também não são compatíveis. 
        Recomendação: para iniciar uma instância com um SO convidado do Microsoft Windows, do Amazon Linux ou de uma das várias outras distribuições conhecidas do Linux, selecione “Launch instances” (Iniciar instâncias) e, depois, escolha entre as disponíveis na guia “Quick Start”.

    Tipos de instância compatíveis: nano, micro, small, medium e large.

    Somente instâncias sob demanda

    Limites de instâncias em execução simultânea de acordo com a região compatível: 

        Máximo de nove instâncias do EC2 em execução simultânea, independentemente do tamanho da instância. Se você tentar iniciar mais, as instâncias excedentes serão terminadas (e nove permanecerão em execução).

        Observação: serviços, como EMR, Cloud9, Elastic Beanstalk, também podem iniciar instâncias do EC2. As nove instâncias do EC2 em execução simultânea se aplicam a todos os serviços que criam instâncias visíveis no console do EC2.

        Máximo de 32 vCPUs usadas por instâncias em execução simultânea, independentemente do tamanho ou do número de instâncias. Por exemplo, instâncias t2.micro usam uma vCPU cada, então, é possível executar até 32 em us-west-2 (mas apenas nove em us-east-1 devido à outra limitação listada acima)

        Observação: o limite máximo de 32 vCPUs se aplica a todos os serviços que criam instâncias visíveis no console do EC2.

        Cuidado: qualquer tentativa de ter 20 ou mais instâncias em execução simultânea (seja qual for o tamanho) causará a desativação imediata da conta da AWS e a exclusão instantânea de todos os recursos na conta.
        Recomendação: defina sua necessidade real para evitar o uso acima de seu orçamento de custo.

    Volumes do EBS: tamanhos de até 100 GB e o tipo deve ser SSD de uso geral (gp2, gp3) HDD frio (sc1) ou padrão.

    Pares de chaves: se você estiver criando uma instância do EC2 em qualquer Região AWS que não seja a us-east-1, o par de chaves vockey não estará disponível. Nesses casos, você precisa criar um par de chaves e baixá-lo ao criar a instância do EC2. Depois, use o novo par de chaves para se conectar a essa instância.

    Uma função denominada LabRole e um perfil de instância denominado LabInstanceProfile foram pré-criados para você. Você poderá anexar a função (por meio do perfil de instância) a uma instância do EC2 quando desejar acessar uma instância do EC2 (terminal no navegador) usando o AWS Systems Manager Session Manager. A função também concede permissões a todos os aplicativos em execução na instância para acessar muitos outros serviços da AWS por meio da instância.

    Dicas: 
        Quando sua sessão terminar, o ambiente de laboratório poderá colocar as instâncias em execução no estado “interrompido”. 
        Ao iniciar uma nova sessão, o ambiente de laboratório iniciará todas as instâncias que foram interrompidas anteriormente por você ou pelo ambiente de laboratório quando a sessão foi encerrada.
        As instâncias que foram interrompidas e reiniciadas receberão um novo endereço IP público IPv4, a menos que você tenha um endereço de IP elástico associado à instância.

    Recomendações: 
        Para preservar seu orçamento de laboratório, interrompa todas as instâncias do EC2 em execução antes de parar de usar a conta no dia (e termine-as se não forem mais necessárias).
        Esteja ciente de todas as instâncias mantidas na conta entre as sessões porque elas serão executadas (e lançadas em seu orçamento) quando você reiniciar o laboratório novamente, a menos que você se lembre de interrompê-las manualmente depois de iniciar o laboratório.

Amazon Elastic Container Registry (ECR)

    O perfil do IAM LabRole tem acesso somente leitura a esse serviço e, como usuário do console, você tem acesso de gravação a ele.

Amazon Elastic Container Service (ECS)

    Para evitar erros de permissão, defina LabRole como a função a ser usada sempre que for solicitada a especificação de uma função. Por exemplo, como a função de tarefa e a função de execução da tarefa ao criar uma definição de tarefa.
    Tipos de instância compatíveis: nano, micro, small, medium e large.

Amazon Elastic File System (EFS)

    Esse serviço pode assumir o perfil do IAM LabRole.

Amazon Elastic Inference
Amazon Elastic Kubernetes Service (EKS)

    Esse serviço pode assumir o perfil do IAM LabRole.
    Tipos de instância compatíveis: nano, micro, small, medium e large.

Elastic Load Balancing (ELB)

    Esse serviço pode assumir o perfil do IAM LabRole.

Amazon Elastic MapReduce (EMR)

    Esse serviço pode assumir o perfil do IAM LabRole.
    Tipos de instância compatíveis: nano, micro, small, medium e large. Se você tentar iniciar um tipo de instância maior, ela será terminada.
    Máximo de 32 vCPUs usadas por instâncias do EC2 de execução simultânea em uma Região AWS. Observe que você também está limitado a iniciar até nove instâncias (de qualquer tamanho) em uma região simultaneamente.

Amazon ElastiCache
Amazon EventBridge
AWS Fargate

    Esse serviço pode assumir o perfil do IAM LabRole.

Amazon Forecast

    Esse serviço pode assumir o perfil do IAM LabRole.

AWS Glue

    Esse serviço pode assumir o perfil do IAM LabRole.

AWS Glue DataBrew

    Esse serviço pode assumir o perfil do IAM LabRole.

Amazon GuardDuty
AWS Health
AWS Identity and Access Management (IAM)

    Acesso extremamente limitado. Você não pode criar usuários nem grupos. Não é possível criar funções, exceto funções vinculadas a serviço.

    A criação de um perfil de serviço geralmente é permitida. Se o serviço precisar criar uma função para você, talvez seja necessário tentar criar novamente a função se ocorrer uma falha na primeira vez.

    Uma função denominada LabRole já foi criada para você. Essa função foi projetada para ser usada quando você deseja anexar uma função a um recurso em um serviço da AWS. Ela concede a muitos serviços da AWS acesso a outros serviços da AWS e tem permissões muito semelhantes às que você tem como usuário no console. 
        Exemplo de uso: anexe a LabRole por meio do perfil de instância denominado LabInstanceProfile a uma instância do EC2 para terminal no acesso do navegador a um SO convidado da instância do EC2 usando o AWS Systems Manager Session Manager.
        Outro exemplo: anexe a LabRole a uma função do Lambda para que ela possa acessar o S3, o CloudWatch, o RDS ou outro serviço.
        Outro exemplo: anexe a LabRole a uma instância do bloco de notas do SageMaker para que ela possa acessar arquivos em um bucket do S3.

AWS IAM Access Analyzer
Amazon EC2 Image Builder
Amazon Inspector
AWS IoT 1-Click
Analytics de IoT da AWS

    Esse serviço pode assumir o perfil do IAM LabRole.

AWS IoT Core

    Esse serviço pode assumir o perfil do IAM LabRole.

AWS IoT Greengrass
Amazon Kendra

    Esse serviço pode assumir o perfil do IAM LabRole.

AWS Key Management Service (KMS)

    Esse serviço pode assumir o perfil do IAM LabRole.

Amazon Kinesis

    Se você tentar criar um Bloco de notas do Kinesis Data Analytics Studio, selecione “Create with custom settings” (Criar com configurações personalizadas) e, depois, LabRole na área de configurações do IAM. 
    Se você tentar criar um stream de entrega do Kinesis, selecione “Advance settings” (Configurações avançadas) e, depois, use a LabRole existente.

Amazon Kinesis Video Streams
AWS Lambda

    Dica: anexe a LabRole existente a qualquer função que você criar, se essa função precisar de permissões para interagir com outros serviços da AWS.

Amazon Lex

    Esse serviço pode assumir o perfil do IAM LabRole.

Amazon Machine Learning (Amazon ML)
Assinaturas do AWS Marketplace

    Acesso somente leitura extremamente limitado.

AWS Mobile Hub
Amazon Neptune
AWS OpsWorks
Amazon Personalize

    Esse serviço pode assumir o perfil do IAM LabRole.

Amazon Polly
Amazon QuickSight

    Esse serviço pode assumir o perfil do IAM LabRole.
    Dica: ao criar a conta, selecione Enterprise. Ignore o aviso “This IAM user or role may not have all the correct permissions...” (O usuário ou o perfil do IAM pode não ter todas as permissões corretas...). Para o método de autenticação, selecione “Use IAM federated identities & QuickSight-managed users” (Usar identidade federadas do IAM e usuários gerenciados pelo QuickSight), e para o perfil do IAM, selecione a função existente denominada LabRole.

Amazon Redshift

    Esse serviço pode assumir o perfil do IAM LabRole.

Amazon Rekognition

    Esse serviço pode assumir o perfil do IAM LabRole.

Amazon Relational Database Service (RDS)

    Esse serviço pode assumir o perfil do IAM LabRole.
    Mecanismos de banco de dados compatíveis: Amazon Aurora, Oracle, Microsoft SQL, MySQL, PostgreSQL e MariaDB.
    Tipos de instância compatíveis: nano, micro, small e medium [Dica: selecione Burstable classes (Classes com capacidade de intermitência) para encontrá-las].
    Tipos de armazenamento compatíveis: volumes do EBS, tamanhos de até 100 GB e tipo SSD de uso geral (gp2). Tipos de armazenamento PIOPS não são compatíveis.
    Somente tipos de classe de instância de banco de dados sob demanda.
    O monitoramento aprimorado não é compatível [desmarque essa configuração padrão no painel Additional configuration/Monitoring (Configuração/monitoramento adicionais)].
    Dica: para preservar seu orçamento de laboratório, interrompa todas as instâncias do RDS em execução antes de parar de usar a conta no dia (ou as termine se não forem mais necessárias). 
    Cuidado: quando uma sessão de laboratório termina, talvez o ambiente de laboratório não interrompa uma instância do RDS ou um cluster que você deixar em execução. Além disso, mesmo se você interromper uma instância do RDS, se ela permanecer parada por sete dias, a AWS a reiniciará automaticamente, o que aumentará o impacto nos custos.

AWS Resource Groups & Tag Editor

    Esse serviço pode assumir o perfil do IAM LabRole.

AWS RoboMaker

    Esse serviço pode assumir o perfil do IAM LabRole.
    Tipos de instância compatíveis para ambientes de desenvolvimento: somente nano, micro, small, medium, large e c4.xlarge.

Amazon Route 53

    Não é possível registrar um domínio.

Amazon SageMaker

    Esse serviço pode assumir o perfil do IAM LabRole.

    Você pode criar instâncias do bloco de notas do SageMaker.
        Tipos de instância do bloco de notas compatíveis: somente medium, large e xlarge.
        Tipos de instância de GPU não são compatíveis.

    Somente alguns dos recursos no SageMaker Studio não são compatíveis.
        Observação: para iniciar o SageMaker Studio, selecione Launch SageMaker Studio (Iniciar SageMaker Studio). Aceite o perfil de usuário padrão e especifique LabRole como a função de execução e, depois, selecione Submit (Enviar).  Você receberá duas mensagens de não autorizado porque não podemos conceder a você o acesso iam:CreateRole em laboratórios de aprendizagem. No entanto, o SageMaker Domain ainda será criado e você ainda poderá acessar o SageMaker Studio após alguns minutos se navegar para o painel de controle do SageMaker e, no menu Launch app (Iniciar aplicativo) ao lado do usuário que você criou, selecionar Studio. Isso abrirá o SageMaker Studio. Nessa tela, você pode abrir recursos, como um bloco de notas do Python 3, o console do Python 3 ou o terminam de imagem.
        Alguns projetos JumpStart do SageMaker exigem mais permissões de acesso do que podemos conceder nos laboratórios de aprendizagem.

    Dicas: 
        Quando sua sessão terminar, o ambiente de laboratório poderá colocar todas as instâncias do bloco de notas do SageMaker em execução no estado “interrompido”. As instâncias interrompidas do bloco de notas do SageMaker não serão reiniciadas automaticamente quando você iniciar uma nova sessão.

AWS Secrets Manager

    Esse serviço pode assumir o perfil do IAM LabRole.

AWS Security Hub
AWS Security Token Service (STS)

    Esse serviço pode assumir o perfil do IAM LabRole.

AWS Serverless Application Repository (SAR)
AWS Service Catalog

    Esse serviço pode assumir o perfil do IAM LabRole.

Amazon Simple Notification Service (SNS)

    Esse serviço pode assumir o perfil do IAM LabRole.

Amazon Simple Queue Service (SQS)

    Esse serviço pode assumir o perfil do IAM LabRole.

Amazon Simple Storage Service (S3)

    Esse serviço pode assumir o perfil do IAM LabRole.

Amazon Simple Storage Service Glacier (S3 Glacier)

    Não é possível criar um Vault Lock

Amazon Simple Workflow Service (SWF)
AWS Step Functions
AWS Storage Gateway
AWS Systems Manager (SSM)

    Uma função denominada LabRole e um perfil de instância denominado LabInstanceProfile foram pré-criados para você. Você poderá anexar a função (por meio do perfil de instância) a uma instância do EC2 quando desejar acessar uma instância do EC2 (terminal no navegador) usando o AWS Systems Manager Session Manager.

Amazon Textract
Amazon Timestream
Amazon Transcribe

    Esse serviço pode assumir o perfil do IAM LabRole.

Amazon Translate

    Esse serviço pode assumir o perfil do IAM LabRole.

AWS Trusted Advisor
Amazon Virtual Private Cloud (Amazon VPC)
AWS WAF: Web Application Firewall
AWS Well-Architected Tool
AWS X-Ray
Usar o terminal no navegador

Uma janela de terminal é exibida à esquerda destas instruções. O terminal fornece acesso a um shell do Linux em um servidor que existe fora da conta da AWS que você usa quando seu laboratório está em execução. São configuradas no servidor credenciais que fornecem o mesmo nível de acesso a serviços da AWS pelo terminal que você também tem pelo Console de Gerenciamento da AWS.

 Dica: uma alternativa simples ao uso desse terminal no navegador é usar o AWS CloudShell. Você pode acessá-lo no Console de Gerenciamento da AWS, na parte inicial da tela, selecionando o ícone AWS CloudShell (realçado em vermelho na captura de tela abaixo).

ícone cloudshell

 
Executar comandos da AWS CLI

Veja um exemplo de comando da AWS CLI para tentar executar no terminal. Se você tiver criando instâncias do EC2 na região da conta padrão, executar esse comando fornecerá informações sobre elas:

aws ec2 describe-instances

Consulte a documentação AWS CLI Command Reference (Referência de comandos da AWS CLI) para obter detalhes sobre como usar a AWS CLI.

 
Usar o AWS SDK for Python

O terminal também tem o Python 3 instalado com a biblioteca do boto3 disponível. Você pode usá-lo para executar o código do SDK Python da AWS. Por exemplo:

$ python3

>>> import boto3

>>> ec2 = boto3.client('ec2', region_name='us-east-1')  

>>> ec2.describe_regions()

>>> exit()

$

Consulte a documentação para obter detalhes sobre como usar o AWS SDK for Python.

 
Preservar seu orçamento

Lembre-se, se você exceder seu orçamento de laboratório, sua conta será desativada e todo o andamento e os recursos serão perdidos. Detalhes sobre como monitorar seu orçamento são fornecidos acima.

Sugestões para evitar gastos excessivos:

    Inicie somente o número de instâncias de que você precisa, dimensionadas de acordo com seus requisitos.

    Em geral, são os recursos de computação que você deixa em execução que consomem com maior rapidez seu orçamento. Desative-os quando não forem mais necessários ou, melhor ainda, exclua-os.

    Exemplos de recurso de computação:
        Instâncias do EC2, RDS, Cloud9, NAT Gateway ou SageMaker
        Clusters do EMR, ECS ou EKS
        Aplicativos do Elastic Beanstalk

    Use a AWS Simple Monthly Calculator ou a AWS Pricing Calculator para estimar o custo. 

        Por exemplo, a estimativa mostrada na captura de tela abaixo calculou o custo de executar os seguintes recursos por um mês:

            Uma instância t3.medium do EC2 do Linux em execução por seis horas por dia por um mês na Região us-east-1.

            Um banco de dados MySQL RDS db.t2.small com 20 GB de armazenamento, em execução por um mês na Região us-east-1.

            Um gateway do NAT em execução, processando 1 GB por mês na Região us-east-1

            Estimativa de custo

            Os preços estão sujeitos a alterações. O cálculo acima é apenas um exemplo de um ponto no tempo.

Sugestões adicionais para reduzir o custo:

    Descubra quais recursos existem em sua conta usando o recurso Tag Editor.

    Observação: essa ferramenta não encontra todos os tipos de recurso, mas pode localizar muitos tipos.

        Abra o console do Resource Groups & Tag Editor e selecione Tag Editor.

        Em Regions (Regiões), selecione us-east-1 e us-west-2 e, em Resource types (Tipos de recurso), escolha All supported resource types (Todos os tipos de recurso compatíveis). Por fim, selecione Search resources (Pesquisar recursos).

        Aguarde a conclusão da pesquisa. Você verá um grande número de avisos na parte superior da tela, indicando que não tem permissões para visualizar determinados recursos. Você pode ignorar esses avisos.

        Role a tela para baixo até o painel Resource search results (Resultado da pesquisa de recursos) para ver os recursos encontrados.
            Alguns dos recursos já existiam em sua conta quando você iniciou o laboratório e eles não consumirão uma quantidade significativa de seu orçamento.  Eles incluem recursos do IAM, duas funções do Lambda, vários grupos de segurança e outros recursos relacionados à VPC.
            No entanto, você pode perceber outros recursos nos resultados da pesquisa criados por você e que, talvez, não sejam mais necessários.

    Crie suas soluções usando modelos do CloudFormation.
        Você pode usar o serviço para criar uma pilha que crie vários recursos nos serviços da AWS. Depois, quando você não precisar mais dos recursos, exclua a pilha (o que excluirá todos os recursos que ela criou). Você sempre pode usar o mesmo modelo para criar uma pilha para que ela recrie os recursos durante sua próxima sessão.

    Acesse o AWS Trusted Advisor e examine os resultados de otimização de custos. O serviço pode ajudar a identificar instâncias do EC2 com baixas taxas de utilização, instâncias ociosas do RDS ou Classic Load Balancers, volumes do EBS subutilizados e outras condições que podem ajudar você a economizar o valor restante em seu orçamento de laboratório.

 
Acessar instâncias do EC2

Ao iniciar instâncias do EC2 na Região us-east-1 nesse ambiente, selecione a opção para usar o par de chaves existente denominado vockey no momento da inicialização.  Então:

    Selecione o link  AWS Details (Detalhes da AWS) acima destas instruções.
        Se você estiver usando um desktop ou um laptop Windows, selecione o botão Download PPK (Baixar PPK) e salve o arquivo labsuser.ppk. Você pode usar esse arquivo para se conectar por SSH a uma instância do Linux EC2 ou do Windows EC2, geralmente usando uma ferramenta, como PuTTY.
        Se você estiver usando um desktop ou um laptop MacOS, selecione o botão Download PEM (Baixar PEM) e salve o arquivo labsuser.pem. Você pode usar esse arquivo para se conectar por SSH a uma instância do Linux EC2 ou do Windows EC2, geralmente usando uma janela de terminal.

    Para conectar-se via área de trabalho remota a uma instância do Windows EC2:
        No console do EC2, selecione Instances (Instâncias) e a instância à qual você deseja se conectar
        No menu Actions (Ações), selecione Get Windows Password (Obter senha do Windows)
        Ao lado de Key Pair Path (Caminho do par de chaves), selecione Browse (Procurar).
        Procure e selecione o arquivo labsuser.pem que você baixou antes.
        Selecione Decrypt Password (Descriptografar senha).
        As informações de conexão estão sendo exibidas, como o DNS público da instância, o nome do usuário administrador e a senha descriptografada.
        Use um cliente do Remote Desktop Protocol (RDP) para conectar-se ao desktop da instância do EC2 usando esses detalhes de conexão.
        Para se conectar usando SSH a uma instância do Linux, consulte a próxima seção.

Acesso por SSH a uma instância do EC2 que você iniciar

As etapas abaixo descrevem como usar a chave SSH para se conectar à sua instância.

Dica: supondo-se que você tenha iniciado a instância com o par de chaves vockey e aberto a porta TCP 22 no grupo de segurança da instância, você também pode se conectar via SSH a uma instância do EC2 usando o terminal ao lado destas instruções. O terminal já tem o par de chaves disponível. Basta inserir o comando ssh -i ~/.ssh/labsuser.pem ec2-user@<public-ip>, em que <public-ip> é o endereço público IPv4 real da instância.
Usuários do Windows: usar SSH para conexão

 Estas instruções são apenas para usuários do Windows.

    Baixe o software necessário.
        Você usará o PuTTY para se conectar às instâncias do Amazon EC2 com SSH. Se você não tiver o PuTTY instalado em seu computador, baixe-o aqui.

    Abra o putty.exe

    Configure o PuTTY para não atingir o tempo limite:
        Selecione Connection (Conexão)
        Defina Seconds between keepalives (Segundos entre os keepalives) como 30

    Isso permite manter a sessão do PuTTY aberta por mais tempo.

    Configure a sua sessão do PuTTY:
        Selecione Session (Sessão)
        Host Name (or IP address) (Nome do host ou endereço IP): copie e cole o IPv4 Public IP address (Endereço IP público IPv4) para a instância. Para encontrá-lo, retorne ao console do EC2 e selecione Instances (Instâncias). Marque a caixa ao lado da instância e, na guia Description (Descrição), copie o valor de IPv4 Public IP (IP público IPv4).
        De volta ao PuTTy, na lista Connection (Conexão), expanda  SSH
        Selecione Auth (Autenticação) (sem expandir)
        Selecione Browse (Procurar)
        Procure e selecione o arquivo .ppk que você baixou
        Selecione Open (Abrir) para selecioná-lo
        Selecione Open (Abrir)

    Selecione Yes (Sim) para confiar no host e conectar-se a ele.

    Quando a janela Login as (Fazer login como) aparecer, insira ec2-user

    Isso o(a) conectará à instância do EC2.

 
Usuários do macOS e Linux : usar o SSH para se conectar

Estas instruções são apenas para usuários do Mac/Linux.

    Leia os dois tópicos desta etapa antes de iniciar as ações, uma vez que não será possível visualizar estas instruções quando o painel AWS Details (Detalhes da AWS) estiver aberto.

        Selecione o link  AWS Details (Detalhes da AWS) acima destas instruções.

        Selecione o botão Download PEM (Baixar PEM) e salve o arquivo labsuser.pem.

        Normalmente, seu navegador o salva no diretório Downloads.

    Abra uma janela do terminal e altere o diretório cd para o diretório no qual o arquivo .pem foi baixado.

    Por exemplo, execute este comando se ele tiver sido salvo no diretório Downloads:

    cd ~/Downloads

    Altere as permissões na chave para serem somente leitura, executando este comando:

    chmod 400 labsuser.pem

    Retorne ao Console de Gerenciamento da AWS e, no serviço do EC2, selecione Instances (Instâncias).

    Marque a caixa ao lado da instância à qual você deseja se conectar.

    Na guia Description (Descrição), copie o valor de IPv4 Public IP (IP público IPv4).

    Retorne à janela do terminal e execute este comando (substitua <public-ip> pelo endereço IP público real que você copiou):

    ssh -i <filename>.pem ec2-user@<public-ip>

    Digite yes (sim) quando solicitado para permitir a primeira conexão ao servidor SSH remoto.

    Como você está usando um par de chaves para autenticação, não será necessário fornecer uma senha.

     

© 2022 Amazon Web Services, Inc. e suas afiliadas. Todos os direitos reservados. Este trabalho não pode ser reproduzido ou redistribuído, no todo ou em parte, sem a permissão prévia por escrito da Amazon Web Services, Inc. É proibido copiar, emprestar ou vender para fins comerciais.
