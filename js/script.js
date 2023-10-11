'use strict';

{
  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list';

  const titleClickHandler = function(event) {
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
    console.log(this);

    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');
    for (const activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */
    console.log('clickedElement:', clickedElement);
    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('article');
    for(let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }
    /* [DONE] get 'href' attribute from the clicked link */
    const attribute = clickedElement.getAttribute('href');
    console.log('href attribute: ', attribute);
    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const correctArticle = document.querySelector(attribute);
    console.log('correctArticle: ', correctArticle);
    /* [DONE] add class 'active' to the correct article */
    correctArticle.classList.add('active');
  };

  const generateTitleLinks = function () {
    console.log('Wywołanie funkcji generateTitleLinks');

    /* clear links list in aside section */

    const titleList = document.querySelector(optTitleListSelector);
    console.log('titleList: ', titleList);

    titleList.innerHTML = '';
    console.log('Titles cleared');

    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector);
    console.log('articles: ', articles);

    let html = '';

    for (let article of articles) {
      /* [DONE] get the article id */
      const articleId = article.getAttribute('id');
      console.log('articleID: ', articleId);
      /* [DONE] find the title element */
      /* [DONE] get the title from the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      console.log('articleTitle: ', articleTitle);
      /* [DONE] create HTML of the link */
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      console.log(linkHTML);
      /* [DONE] insert link into titleList */
      html = html + linkHTML;

      /* titleList.insertAdjacentHTML (
            'beforebegin',
            titleList.innerHTML + linkHTML,
        ); */
    }
    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');
    console.log('links: ', links);

    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }

  };
  generateTitleLinks();

  // eslint-disable-next-line no-inner-declarations
  function generateTags() {
    console.log('Wywolanie generateTags');
    /* [DONE] find all articles */
    const allArticles = document.querySelectorAll('article');
    console.log('Zawartosc allArticles: ', allArticles);
    /* START LOOP: for every article: */{
      for (let article of allArticles) {
        /* find tags wrapper */
        console.log('optArticleTagsSelector - ', optArticleTagsSelector);
        const tagsWrapper = article.querySelector(optArticleTagsSelector);
        console.log('Tags wrapper = ', tagsWrapper);
        /* make html variable with empty string */
        let html = '';
        /* get tags from data-tags attribute */
        const dataTags = article.getAttribute('data-tags');
        console.log('dataTags: ', dataTags);
        /* split tags into tagArray */
        const tagArr = dataTags.split(' ');
        console.log('Tablica: ', tagArr);
        /* START LOOP: for each tag */
        for (let tag of tagArr){
          /* generate HTML of the link */
          const linkHTML = '<li><a href="#' + tag + '"><span>' + tag + '</span></a></li>';
          console.log(linkHTML);
          /* add generated code to html variable */
          html = html + ' ' + linkHTML; 
          console.log('HTML - ', html);
        /* END LOOP: for each tag */
        }
        /* insert HTML of all the links into the tags wrapper */
        console.log('html after loop - ', html);
        tagsWrapper.innerHTML = html;
        /* END LOOP: for every article: */
      }
    }
  }
  generateTags();

}