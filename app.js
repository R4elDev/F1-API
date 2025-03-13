function mostrarTela(tela) {
    // Esconde todas as telas
    document.getElementById("telaInicial").style.display = "none";
    document.getElementById("telaHome").style.display = "none";
    document.getElementById("dadosPiloto").style.display = "none";
    
    // Mostra a tela escolhida
    if (tela === 'inicial') {
      document.getElementById("telaInicial").style.display = "block";
    } else if (tela === 'home') {
      document.getElementById("telaHome").style.display = "block";
    } else if (tela === 'dadosPiloto') {
      document.getElementById("dadosPiloto").style.display = "block";
    }
  }