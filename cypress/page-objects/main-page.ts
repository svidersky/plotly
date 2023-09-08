export default class MainPage {
    get testimonialsTitle() {
      return cy.contains('h2', 'Loved by OSS');
    }
    get weeklyDownloads() {
        return cy.get('div.grow:visible') // select only visible div elements with the class grow
                 .contains('M+') // yeld the unique element that contains the text 'M+'
    }
}
