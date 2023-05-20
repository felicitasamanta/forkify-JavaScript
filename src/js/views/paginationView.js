import View from './View';
import icons from '../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      e.preventDefault;
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = Number(btn.dataset.goto);

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const page = this._data.page;
    const totalPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    const hasPages = totalPages > 1;

    if (!hasPages) return;

    const isFirstPage = page === 1;
    const isMiddlePage = page > 1 && page < totalPages;
    const position = isFirstPage ? 'first' : isMiddlePage ? 'middle' : 'last';

    switch (position) {
      case 'first':
        return this._generateMarkupButton('next');
      case 'last':
        return this._generateMarkupButton('prev');
      default:
        return `${this._generateMarkupButton(
          'prev'
        )} ${this._generateMarkupButton('next')}`;
    }
  }

  /**
   * @param {'prev' | 'next'} direction - Button direction.
   */
  _generateMarkupButton(direction) {
    const isNext = direction === 'next';
    const page = isNext ? this._data.page + 1 : this._data.page - 1;
    const arrow = isNext ? 'right' : 'left';

    return `
      <button data-goto="${page}" class="btn--inline pagination__btn--${direction}">
            <span>Page ${page}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-${arrow}"></use>
            </svg>
        </button> 
      `;
  }
}

export default new PaginationView();
