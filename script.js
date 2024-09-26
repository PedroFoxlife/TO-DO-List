document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('modal');
  const abrirModalBtn = document.getElementById('abrir-modal');
  const closeModalBtn = document.querySelector('.close');
  const adicionarTarefaBtn = document.getElementById('adicionar-tarefa');
  const novaTarefaInput = document.getElementById('nova-tarefa');
  const tarefasPendentes = document.getElementById('tarefas-pendentes');
  const tarefasAndamento = document.getElementById('tarefas-andamento');
  const tarefasProgresso = document.getElementById('tarefas-progresso');
  const tarefasConcluidas = document.getElementById('tarefas-concluidas');

  abrirModalBtn.addEventListener('click', function () {
    modal.style.display = 'flex';
  });

  closeModalBtn.addEventListener('click', function () {
    modal.style.display = 'none';
  });

  adicionarTarefaBtn.addEventListener('click', function () {
    const tarefaTexto = novaTarefaInput.value.trim();
    if (tarefaTexto !== '') {
      const novaTarefa = document.createElement('li');
      novaTarefa.textContent = tarefaTexto;
      novaTarefa.setAttribute('data-status', 'pendente');
      novaTarefa.setAttribute('draggable', 'true');
      novaTarefa.setAttribute('id', 'tarefa-' + Date.now()); // Adiciona um ID único
      const moverBtn = document.createElement('button');
      moverBtn.textContent = '>';
      moverBtn.classList.add('mover-tarefa');
      novaTarefa.appendChild(moverBtn);
      tarefasPendentes.appendChild(novaTarefa);
      novaTarefaInput.value = '';
      modal.style.display = 'none';

      // Adiciona eventos de dragstart e dragend à nova tarefa
      novaTarefa.addEventListener('dragstart', function (event) {
        event.dataTransfer.setData('text/plain', event.target.id);
        event.target.classList.add('dragging');
      });

      novaTarefa.addEventListener('dragend', function (event) {
        event.target.classList.remove('dragging');
      });
    }
  });

  document.addEventListener('click', function (e) {
    if (e.target.classList.contains('mover-tarefa')) {
      const tarefa = e.target.parentElement;
      const statusAtual = tarefa.getAttribute('data-status');
  
      // Adiciona a animação ao mover a tarefa
      tarefa.classList.add('tarefa-animada');
  
      // Remove a animação após 1 segundo
      setTimeout(() => {
        tarefa.classList.remove('tarefa-animada');
      }, 1000);
  
      if (statusAtual === 'pendente') {
        tarefa.setAttribute('data-status', 'andamento');
        tarefasAndamento.appendChild(tarefa);
      } else if (statusAtual === 'andamento') {
        tarefa.setAttribute('data-status', 'progresso');
        tarefasProgresso.appendChild(tarefa);
      } else if (statusAtual === 'progresso') {
        tarefa.setAttribute('data-status', 'concluida');
        tarefasConcluidas.appendChild(tarefa);
  
        // Substitui o botão "Mover" por um botão "Remover"
        const moverBtn = tarefa.querySelector('.mover-tarefa');
        moverBtn.textContent = 'X';
        moverBtn.classList.remove('mover-tarefa');
        moverBtn.classList.add('remover-tarefa');
        moverBtn.style.backgroundColor = 'red';
      }
    } else if (e.target.classList.contains('remover-tarefa')) {
      const tarefa = e.target.parentElement;
      tarefa.remove();
    }
  });
  
  

  function inicializarDragAndDrop() {
    const colunas = document.querySelectorAll('.coluna ul');

    colunas.forEach((coluna) => {
      coluna.addEventListener('dragover', function (event) {
        event.preventDefault();
        const dragging = document.querySelector('.dragging');
        const afterElement = getDragAfterElement(coluna, event.clientY);
        if (afterElement == null) {
          coluna.appendChild(dragging);
        } else {
          coluna.insertBefore(dragging, afterElement);
        }
      });

      coluna.addEventListener('drop', function (event) {
        event.preventDefault();
        const idTarefa = event.dataTransfer.getData('text/plain');
        const tarefaArrastada = document.getElementById(idTarefa);

        let destino = event.target;
        if (destino.tagName === 'LI') {
          destino = destino.parentElement;
        }

        destino.appendChild(tarefaArrastada);

        // Adiciona a classe de animação temporariamente
        tarefaArrastada.classList.add('animacao-transicao');
        setTimeout(() => {
          tarefaArrastada.classList.remove('animacao-transicao');
        }, 300);

        if (destino.id === 'tarefas-andamento') {
          tarefaArrastada.style.backgroundColor = 'orange';
        } else if (destino.id === 'tarefas-progresso') {
          tarefaArrastada.style.backgroundColor = 'purple';
        } else if (destino.id === 'tarefas-concluidas') {
          tarefaArrastada.style.backgroundColor = 'green';

          // Substitui o botão "Mover" por um botão "Remover"
          const moverBtn = tarefaArrastada.querySelector('.mover-tarefa');
          moverBtn.textContent = 'X';
          moverBtn.classList.remove('mover-tarefa');
          moverBtn.classList.add('remover-tarefa');
          moverBtn.style.backgroundColor = 'red';
        } else {
          tarefaArrastada.style.backgroundColor = 'white';
        }
      });
    });
  }

  function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('li:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
  }

  inicializarDragAndDrop();
});

document.addEventListener('DOMContentLoaded', function () {
  const text = 'PedroDev   Aluno SENAI.';
  const typingSpeed = 150; // Velocidade da "digitação" em milissegundos
  let index = 0;

  function typeText() {
    if (index < text.length) {
      document.getElementById('typing-text').innerHTML += text.charAt(index);
      index++;
      setTimeout(typeText, typingSpeed);
    }
  }

  // Inicia o efeito de digitação
  typeText();
});
