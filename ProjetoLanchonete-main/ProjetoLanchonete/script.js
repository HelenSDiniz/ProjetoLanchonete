let funcionarios = JSON.parse(localStorage.getItem('funcionarios')) || [];
let pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];

document.getElementById('formFuncionario').addEventListener('submit', function(event) {
    event.preventDefault();
    const nome = document.getElementById('nomeFuncionario').value;
    const cpf = document.getElementById('cpfFuncionario').value;

    if (validarCpf(cpf)) {
        const funcionario = { id: funcionarios.length + 1, nome, cpf };
        funcionarios.push(funcionario);
        localStorage.setItem('funcionarios', JSON.stringify(funcionarios));
        atualizarResponsaveis();
        this.reset();
    } else {
        alert('CPF inválido. Deve ter 11 dígitos.');
    }
});

document.getElementById('formPedido').addEventListener('submit', function(event) {
    event.preventDefault();
    const nomePedido = document.getElementById('nomePedido').value;
    const descricao = document.getElementById('descricaoPedido').value;
    const responsavelId = document.getElementById('responsavel').value;
    const status = document.getElementById('status').value;

    const pedido = { id: pedidos.length + 1, nomePedido, descricao, responsavelId, status };
    pedidos.push(pedido);
    localStorage.setItem('pedidos', JSON.stringify(pedidos));
    listarPedidos();
    this.reset();
});

function atualizarResponsaveis() {
    const selectResponsavel = document.getElementById('responsavel');
    selectResponsavel.innerHTML = '';
    funcionarios.forEach(funcionario => {
        const option = document.createElement('option');
        option.value = funcionario.id;
        option.textContent = funcionario.nome;
        selectResponsavel.appendChild(option);
    });
}

function listarPedidos() {
    const listaPedidos = document.getElementById('listaPedidos');
    listaPedidos.innerHTML = '';
    pedidos.forEach(pedido => {
        const funcionario = funcionarios.find(f => f.id == pedido.responsavelId);
        const div = document.createElement('div');
        div.textContent = `Pedido: ${pedido.nomePedido}, Responsável: ${funcionario ? funcionario.nome : 'N/A'}, Status: ${pedido.status}`;
        listaPedidos.appendChild(div);
    });
}

function validarCpf(cpf) {
    return cpf.length === 11 && /^\d+$/.test(cpf);
}

atualizarResponsaveis();
listarPedidos();
