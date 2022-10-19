$("#btnenviar").click(function() {
    var mensagem = '';
    var validado = true;
    

    if($("#nomecompleto").val() == '') {
        mensagem = mensagem + "Favor preencher o nome ! <br>";
        validado = false;
    }   

    if($("#gmid").val() == '') {
        mensagem = mensagem + "Favor colocar seu email ! <br>";
        validado = false;
    }  

    if($("#telefone").val() == '') {
        mensagem = mensagem + "Favor preencher o telefone ! <br>";
        validado = false;
    }
    if($("#descfalha").val() == '') {
        mensagem = mensagem + "Favor preencher a descrição da falha ! <br>";
        validado = false;
    }  
    if($("#resolucao").val() == '') {
        mensagem = mensagem + "Favor preencher a resolução da falha ! <br>";
        validado = false;
    }    

    if(validado == false) {
        exibeMensagem("Erro !", mensagem ,"error");
    } else {
       // exibeMensagem("Sucesso !", "Dados enviados com sucesso !", "success");
        enviaremail($("#nomecompleto").val(), $("#gmid").val(), $("#telefone").val(), $("#descfalha").val(), $("#resolucao").val());
    }

});

//INICIO - Exibe as mensagens de validação ao usuário
function exibeMensagem(titulo, mensagem, tipo){
    new PNotify({
        title: titulo,
        text: mensagem,
        type: tipo,
        styling: 'bootstrap3'
    });
}
//FIM
function enviaremail(nomecompleto, gmid, telefone, descfalha, resolucao) {
    // Envia requisição para API disparar o envio do email
    const data = {
        fullname: nomecompleto,
        gmIn: gmid,
        phone: telefone,
        description: descfalha,
        resolution: resolucao,
    }

    fetch('https://api-clayson.herokuapp.com/email/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        exibeMensagem(
            'Sucesso',
            'Relatório enviado.',
            'success'
        );
    })
    .catch((error) => {
        console.log(error);
        exibeMensagem(
            'Erro', 
            'Não foi possível enviar o relatório. Tente novamente mais tarde.',
            'error'
        );
    });
};

    



    

