export class CarrinhoBuilder {
    constructor() {
        this.carrinho = {itens: [{produto: 'Produto', preco: 100}], user: null};
    }

    comUser(user) {
        this.carrinho.user = user;
        return this;
    }

    comItens(itens) {
        this.carrinho.itens = itens;
    }

    vazio(){
        this.carrinho.itens = [];
        return this;
    }
    
    build(){
        return this.carrinho;
    }
}