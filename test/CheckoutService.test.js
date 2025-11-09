import { checkoutService } from '../services/CheckoutService';
import { CarrinhoBuilder } from './builders/CarrinhoBuilder';
import { UserMother } from './builders/UserMother';

describe('CheckoutService', () => {
  describe('quando o pagamento falha', () => {
    it('deve retornar null se o pagamento falhar', async () => {
      const gatewayStub = { cobrar: jest.fn().mockResolvedValue({ success: false }) };
      const carrinho = new CarrinhoBuilder().comUser(UserMother.umUsuarioPadrao()).build();
      
      const pedido = await checkoutService.processarPedido(carrinho, gatewayStub);
      
      expect(pedido).toBeNull();
    });
  });
  
  describe('quando um cliente Premium finaliza a compra', () => {
    it('deve aplicar o desconto e enviar email de sucesso', async () => {
      const usuarioPremium = UserMother.umUsuarioPremium();
      const carrinho = new CarrinhoBuilder().comUser(usuarioPremium).comItens([{ produto: 'Produto B', preco: 200 }]).build();
      const gatewayStub = { cobrar: jest.fn().mockResolvedValue({ success: true }) };
      const pedidoRepoStub = { salvar: jest.fn().mockResolvedValue(true) };
      const emailMock = { enviarEmail: jest.fn() };

      await checkoutService.processarPedido(carrinho, gatewayStub, pedidoRepoStub, emailMock);

      expect(gatewayStub.cobrar).toHaveBeenCalledWith(180, expect.anything());
      expect(emailMock.enviarEmail).toHaveBeenCalledTimes(1);
      expect(emailMock.enviarEmail).toHaveBeenCalledWith('premium@email.com', 'Seu Pedido foi Aprovado!');
    });
  });
});
