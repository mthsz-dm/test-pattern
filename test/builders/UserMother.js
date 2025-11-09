export class UserMother {
  static umUsuarioPadrao() {
    return { id: 1, nome: 'Usuário Padrão', tipo: 'normal' };
  }

  static umUsuarioPremium() {
    return { id: 2, nome: 'Usuário Premium', tipo: 'premium' };
  }
}