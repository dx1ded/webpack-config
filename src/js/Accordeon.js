export class Accordeon {
  constructor() {
    this.accordeonButtons = [...document.querySelectorAll('.accordeon__item-title')]
  }

  init() {
    this.accordeonButtons.map(
      element => element.addEventListener('click', this.clickHandler)
    )
  }

  clickHandler(event) {
    let parent = event.target.closest('.accordeon__item')

    if (parent.classList.contains('active')) return

    document.querySelector('.accordeon__item.active')
      .classList.remove('active')

    parent.classList.add('active')
  }
}
