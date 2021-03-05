export class Burger {
  constructor() {
    this.burgerContainer = document.querySelector('.burger')
    this.burgerButtons = [...document.querySelectorAll('.burger__button')]
    this.burgerLinks = [...document.querySelectorAll('.burger__item')]
  }

  burgerAction() {
    this.burgerContainer
      .classList
      .toggle('opened')
  }

  init() {
    [...this.burgerButtons, ...this.burgerLinks].map(
      button => button.addEventListener('click', this.burgerAction.bind(this))
    )
  }
}
