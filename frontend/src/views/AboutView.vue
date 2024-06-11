<template>
  <div class="about">
    <h1 class="title">Über uns</h1>

    <div class="text">
      <p>Diese Seite wurde im Rahmen des Webtechnologien 2 Praktikums an der Hochschule Bochum entwickelt.</p>
      <p>Die Mitglieder unserer Gruppe sind Filip Zastepinski, Tim Stenger, Kwabena Darko und Piet Ulrich.</p>
      
      <p>Wir sind eine engagierte und vielseitige Gruppe von Studenten, die sich für die Entwicklung innovativer Weblösungen begeistern.
      Das Ziel unseres Projekts ist es, eine konkurrenzfähige Spieleplattform zu entwickeln, die den Bedürfnissen der Nutzer gerecht wird.
      Wir kamen auf diese Idee, da die derzeit populären Spieleplattformen zahlreiche Defizite aufweisen:
      Sie sind überladen mit Werbung, unübersichtlich gestaltet und schlichtweg unangenehm zu nutzen.
      Diese negativen Aspekte beeinträchtigen das Spielerlebnis und führen zu Frustrationen bei den Nutzern. 
      Unsere Website soll all diese Punkte besser machen und ein optimales Nutzererlebnis bieten. Wir legen besonderen Wert auf ein klares und ansprechendes Design,
      das eine einfache Navigation ermöglicht. Unsere Plattform wird werbefrei sein, um Ablenkungen und Unterbrechungen zu minimieren. 
      Zudem setzen wir auf eine benutzerfreundliche Oberfläche, die es den Nutzern erlaubt, schnell und einfach die gewünschten Spiele zu finden und zu spielen.</p>
      
      <p>Wir sind stolz auf das, was wir bisher erreicht haben, und freuen uns darauf, unsere Plattform weiter zu entwickeln und zu verfeinern.
      Wir hoffen, dass unsere Arbeit dazu beiträgt, die Standards für Spieleplattformen zu erhöhen und den Nutzern eine bessere und angenehmere Alternative zu bieten.</p>
    </div>
  </div>
</template>

<style scoped>
.about {
  margin-top: 5%;
}
.text {
  text-align: left;
  font-size: 25px;
  font-family: sans-serif;
  margin-left: 25%;
  margin-right: 25%;
}
body {
    overflow-y: scroll;
}
h1.title {
    font-family: sans-serif;
    font-size: 50px;
    text-align: center;
}
div.wrapper {
    width: 100%;
    height: 800px;
    text-align: center;
    font-size: 40px;
    font-family: sans-serif;
}
div.left {
    float: left;
    width: 15%;
    background-color: gainsboro;
    height: 100%

}
div.right {
    float: left;
    width: 15%;
    background-color: gainsboro;
    height: 100%
}
div.main {
    float: left;
    width: 70%;
    background-color: whitesmoke;
    height: 100%
}
</style>