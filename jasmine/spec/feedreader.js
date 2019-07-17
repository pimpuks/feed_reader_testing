/* feedreader.js
 */
$(
  (function() {
    describe('RSS Feeds', function() {
      /* A test to make sure that the allFeeds variable has been defined
       * and that it is not empty.
       */
      it('are defined', function() {
        expect(allFeeds).toBeDefined();
        expect(allFeeds.length).not.toBe(0);
      });

      /* A test that loops through each feed
       * in the allFeeds object and ensures it has a URL defined
       * and that the URL is not empty.
       */
      it('each feed contains URL', function() {
        allFeeds.forEach(function(feed) {
          expect(feed.url).toBeDefined();
          expect(feed.url.length).not.toBe(0);
        });
      });

      /* A test that loops through each feed
       * in the allFeeds object and ensures it has a name defined
       * and that the name is not empty.
       */
      it('each feed contains name', function() {
        allFeeds.forEach(function(feed) {
          expect(feed.name).toBeDefined();
          expect(feed.name.length).not.toBe(0);
        });
      });
    });

    describe('The menu', function() {
      /* A test that ensures the menu element is hidden by default. */

      it('menu is hidden by default', function() {
        let body = document.getElementsByTagName('body')[0];

        expect(body.classList).toEqual(
          jasmine.arrayContaining(['menu-hidden'])
        );
      });

      /* A test that ensures the menu changes
       * visibility when the menu icon is clicked. This test
       * should have two expectations: does the menu display when
       * clicked and does it hide when clicked again.
       */
      it('menu changes visibility when menu icon is clicked', function() {
        const body = document.getElementsByTagName('body')[0];
        const menuIconLink = document.getElementsByClassName(
          'menu-icon-link'
        )[0];
        let bodyClassList = body.classList;
        /* If the menu-hidden is in bodyClassList then check that the class is removed after click
         * i.e. the menu will be shown
         */
        if (bodyClassList.contains('menu-hidden')) {
          menuIconLink.click();
          expect(body.classList).not.toEqual(
            jasmine.arrayContaining(['menu-hidden'])
          );
          // The second click should bring the 'menu-hidden' back to hide the menu
          menuIconLink.click();
          expect(body.classList).toEqual(
            jasmine.arrayContaining(['menu-hidden'])
          );
        } else {
          /* If the menu-hidden is not in bodyClassList then check that the class is added after click
           * i.e. the menu will be hidden
           */
          menuIconLink.click();
          expect(body.classList).toEqual(
            jasmine.arrayContaining(['menu-hidden'])
          );
        }
      });
    });

    describe('Initial Entries', function() {
      /* A test that ensures when the loadFeed
       * function is called and completes its work, there is at least
       * a single .entry element within the .feed container.
       */

      beforeEach(function(done) {
        loadFeed(0, function() {
          done();
        });
      });

      it('loadFeed() function is called and completed', function(done) {
        const feed = document.getElementsByClassName('feed')[0];
        const firstArticle = feed.firstElementChild.firstElementChild;
        // Check child element count of feed which should not zero after loadFeed() is called
        expect(feed.childElementCount).not.toBe(0);
        // Check the first article elements of feed which should have 'entry' as in classList after loadFeed() is called
        expect(firstArticle.classList).toEqual(
          jasmine.arrayContaining(['entry'])
        );
        done();
      });
    });

    describe('New Feed Selection', function() {
      /* A test that ensures when a new feed is loaded
       * by the loadFeed function that the content actually changes.
       * Use loadFeed to load feed HTML5 Rocks feed to compare agains the dummy list
       */

      /* Create dummy list of entry-link to be checked against
       * after the loadFeed() asynchronous call is done
       */

      const feed = document.getElementsByClassName('feed')[0];
      for (i = 0; i < 10; i++) {
        let entryLinkElem = document.createElement('a');
        entryLinkElem.setAttribute('class', 'entry-link');
        entryLinkElem.setAttribute('href', '#');
        const entryElem = document.createElement('article');
        entryLinkElem.appendChild(entryElem);
        feed.appendChild(entryLinkElem);
      }
      const dummyFeedEntries = feed.querySelectorAll('a.entry-link');

      beforeEach(function(done) {
        // Call loadFeed() to load feed HTML5 Rocks feed
        loadFeed(2, function() {
          done();
        });
      });

      it('content changes with loadFeed()', function() {
        const feedHeading = document.getElementsByClassName('header-title')[0]
          .innerHTML;
        const newFeedEntries = feed.querySelectorAll('a.entry-link');
        expect(feedHeading).toEqual(allFeeds[2].name);
        newFeedEntries.forEach((entryLink, index) => {
          expect(entryLink.href).not.toEqual(dummyFeedEntries[index].href);
        });
      });
      // use loadFeed() to load the default feed (first feed) after testing
      afterEach(function() {
        loadFeed(0);
      });
    });
  })()
);
