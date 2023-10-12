
/* eslint-disable no-inner-declarations */
'use strict';

{
  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleAuthorSelector = '.post-author',
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

  function generateTitleLinks(customSelector = '') {
    console.log('Wywołanie funkcji generateTitleLinks');
    console.log(`customSelector = ${customSelector}`);
    /* clear links list in aside section */

    const titleList = document.querySelector(optTitleListSelector);
    console.log('titleList: ', titleList);

    titleList.innerHTML = '';
    console.log('Titles cleared');

    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
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

  }
  generateTitleLinks();

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
          const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
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

  function tagClickHandler(event){
    /* prevent default action for this event */
    console.log(event);
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log('const href: ', href);
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    console.log('tag: ', tag);
    /* find all tag links with class active */
    const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
    console.log('activeTagLinks: ', activeTagLinks);
    /* START LOOP: for each active tag link */
    for (let activeLink of activeTagLinks ){
    /* remove class active */
      activeLink.classList.remove('active');
    /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    const allTagLinks = document.querySelectorAll(`a[href="${href}"]`);
    console.log('allTagLinks - ', allTagLinks);
    /* START LOOP: for each found tag link */
    for (let tagLink of allTagLinks){
    /* add class active */
      tagLink.classList.add('active');
    /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }
  
  function addClickListenersToTags(){
    /* find all links to tags */
    const links = document.querySelectorAll('.post-tags a');
    console.log('Wszystkie linki tagow: ', links);
    /* START LOOP: for each link */
    for (let link of links) {
    /* add tagClickHandler as event listener for that link */
      link.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
    }
  }
  
  addClickListenersToTags();

  function generateAuthors() {
    console.log('Wywolanie generateAuthors');

    /* find all articles */
    const allArticles = document.querySelectorAll('article');
    console.log('Zawartosc allArticles: ', allArticles);
    /* loop for every article */ 
    for (let article of allArticles) {
      /* find authors wrapper */
      const authWrapper = article.querySelector(optArticleAuthorSelector);
      console.log('Author wrappper: ', authWrapper);
      /* make html variable with empty string */
      let html = '';
      /* get tags from data-author attribute */
      const dataAuthor = article.getAttribute('data-author');
      console.log('dataAuthor = ', dataAuthor);
      
      const linkHTML = '<a href="#author-' + dataAuthor + '"> by ' + dataAuthor + '</a>';
      
      html += linkHTML;
      console.log(html);
      /* insert HTML author wrapper */
      authWrapper.innerHTML = html;
    }
  }

  generateAuthors();

  function authorClickHandler(event){
    /* prevent default action for this event and make new constant named "clickedElement" and give it the value of "this" */
    console.log(event);
    event.preventDefault;
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log('const href: ', href);
    /* make a new constant "tag" and extract tag from the "href" constant */
    const author = href.replace('#author-', '');
    console.log('author: ', author);
    /* find all author links with class active */
    const activeAuthorLinks = document.querySelectorAll('a.active[href^="#tag-"]');
    console.log('activeAuthorLinks: ', activeAuthorLinks);
    /* for each active tag link and remove class active */
    for (let activeLink of activeAuthorLinks) {
      activeLink.classList.remove('active');
    }
    /* find all author links with "href" attribute equal to the "href" constant */
    const allAuthorLinks = document.querySelectorAll(`a[href="${href}"]`);
    console.log('allAuthorLinks - ', allAuthorLinks);
    /* loop for each found author link */
    for (let authorLink of allAuthorLinks){
    /* add class active */
      authorLink.classList.add('active');
    /* loop for each found author link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="' + author + '"]');
  }

  function addClickListenersToAuthors(){
    /* find all links to authors */
    const links = document.querySelectorAll('.post-author a');
    console.log(links);
    /* loop for each link */
    for (let link of links)
      link.addEventListener('click', authorClickHandler);
  }

  addClickListenersToAuthors();


}