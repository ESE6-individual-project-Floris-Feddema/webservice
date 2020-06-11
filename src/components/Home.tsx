import React from 'react';
import './Home.css';

function Home() {
    return (
        <div className={"container"}>
            Release notes - Plandar - Version plandar-0.1
            <h2>Story</h2>
            <ul>
                <li>[<a href='https://florisfeddema.atlassian.net/browse/PLAN-1'>PLAN-1</a>] -         Jira board opzetten
                </li>
                <li>[<a href='https://florisfeddema.atlassian.net/browse/PLAN-2'>PLAN-2</a>] -         Github organisatie opzetten
                </li>
                <li>[<a href='https://florisfeddema.atlassian.net/browse/PLAN-3'>PLAN-3</a>] -         Projectbeschrijving maken
                </li>
                <li>[<a href='https://florisfeddema.atlassian.net/browse/PLAN-4'>PLAN-4</a>] -         Architectuur design opzetten
                </li>
                <li>[<a href='https://florisfeddema.atlassian.net/browse/PLAN-5'>PLAN-5</a>] -         CI/CD pipeline omschrijving opzetten
                </li>
                <li>[<a href='https://florisfeddema.atlassian.net/browse/PLAN-6'>PLAN-6</a>] -         Rancher nodes hostnames aanpassen
                </li>
                <li>[<a href='https://florisfeddema.atlassian.net/browse/PLAN-7'>PLAN-7</a>] -         Rancher kubectl test
                </li>
                <li>[<a href='https://florisfeddema.atlassian.net/browse/PLAN-12'>PLAN-12</a>] -         Eerste versie voor stories aanmaken
                </li>
                <li>[<a href='https://florisfeddema.atlassian.net/browse/PLAN-13'>PLAN-13</a>] -         Flutter login pagina mock
                </li>
                <li>[<a href='https://florisfeddema.atlassian.net/browse/PLAN-16'>PLAN-16</a>] -         Flutter API request testen
                </li>
                <li>[<a href='https://florisfeddema.atlassian.net/browse/PLAN-17'>PLAN-17</a>] -         OAuth onderzoeken
                </li>
                <li>[<a href='https://florisfeddema.atlassian.net/browse/PLAN-19'>PLAN-19</a>] -         Rancher NGINX container deployment testen
                </li>
                <li>[<a href='https://florisfeddema.atlassian.net/browse/PLAN-20'>PLAN-20</a>] -         CI/CD tool onderzoek
                </li>
                <li>[<a href='https://florisfeddema.atlassian.net/browse/PLAN-21'>PLAN-21</a>] -         C1 tweede versie
                </li>
                <li>[<a href='https://florisfeddema.atlassian.net/browse/PLAN-22'>PLAN-22</a>] -         C2 eerste versie
                </li>
                <li>[<a href='https://florisfeddema.atlassian.net/browse/PLAN-23'>PLAN-23</a>] -         Onderzoek talen per service
                </li>
                <li>[<a href='https://florisfeddema.atlassian.net/browse/PLAN-24'>PLAN-24</a>] -         ALS onderzoeker WIL IK onderzoeken hoe ik OAuth moet implementeren ZODAT ik dit later goed kan implementeren
                </li>
                <li>[<a href='https://florisfeddema.atlassian.net/browse/PLAN-25'>PLAN-25</a>] -         ALS software engineer WIL IK de Authenticatie Service opzetten ZODAT ik hier later functionaliteit in kan bouwen
                </li>
                <li>[<a href='https://florisfeddema.atlassian.net/browse/PLAN-26'>PLAN-26</a>] -         ALS software engineer WIL IK de Web Service opzetten ZODAT ik hier later functionaliteit aan kan toevoegen
                </li>
                <li>[<a href='https://florisfeddema.atlassian.net/browse/PLAN-27'>PLAN-27</a>] -         ALS software engineer WIL IK de Mobiele Service opzetten ZODAT ik hier later functionaliteit aan kan toevoegen
                </li>
                <li>[<a href='https://florisfeddema.atlassian.net/browse/PLAN-32'>PLAN-32</a>] -         ALS software engineer WIL IK de Company Service opzetten ZODAT ik hier later functionaliteit aan kan toevoegen
                </li>
                <li>[<a href='https://florisfeddema.atlassian.net/browse/PLAN-33'>PLAN-33</a>] -         ALS software engineer WIL IK bepalen welke technologieën gebruik gaan worden voor de Authenticatie Service ZODAT ik dit op een goede manier kan opzetten
                </li>
                <li>[<a href='https://florisfeddema.atlassian.net/browse/PLAN-34'>PLAN-34</a>] -         ALS software engineer WIL IK bepalen welke technologieën gebruik gaan worden voor de Company Service ZODAT ik dit op een goede manier kan opzetten
                </li>
                <li>[<a href='https://florisfeddema.atlassian.net/browse/PLAN-35'>PLAN-35</a>] -         ALS software engineer WIL IK bepalen welke technologieën gebruik gaan worden voor de Mobiele Service ZODAT ik dit op een goede manier kan opzetten
                </li>
                <li>[<a href='https://florisfeddema.atlassian.net/browse/PLAN-36'>PLAN-36</a>] -         ALS software engineer WIL IK bepalen welke technologieën gebruik gaan worden voor de Web Service ZODAT ik dit op een goede manier kan opzetten
                </li>
                <li>[<a href='https://florisfeddema.atlassian.net/browse/PLAN-37'>PLAN-37</a>] -         ALS gebruiker WIL IK kunnen registreren ZODAT ik een account heb
                </li>
                <li>[<a href='https://florisfeddema.atlassian.net/browse/PLAN-38'>PLAN-38</a>] -         ALS gebruiker WIL IK kunnen inloggen ZODAT ik gebruik kan maken van de applicatie
                </li>
                <li>[<a href='https://florisfeddema.atlassian.net/browse/PLAN-39'>PLAN-39</a>] -         ALS DevOps engineer WIL IK een bouwstraat opzetten voor de Authenticatie Service ZODAT deze automatisch getest en gebouwd worden
                </li>
                <li>[<a href='https://florisfeddema.atlassian.net/browse/PLAN-40'>PLAN-40</a>] -         ALS DevOps engineer WIL IK een bouwstraat opzetten voor de Company Service ZODAT deze automatisch getest en gebouwd worden
                </li>
                <li>[<a href='https://florisfeddema.atlassian.net/browse/PLAN-41'>PLAN-41</a>] -         ALS DevOps engineer WIL IK een bouwstraat opzetten voor de Mobiele Service ZODAT deze automatisch getest en gebouwd worden
                </li>
                <li>[<a href='https://florisfeddema.atlassian.net/browse/PLAN-42'>PLAN-42</a>] -         ALS DevOps engineer WIL IK een bouwstraat opzetten voor de Web Service ZODAT deze automatisch getest en gebouwd worden
                </li>
                <li>[<a href='https://florisfeddema.atlassian.net/browse/PLAN-50'>PLAN-50</a>] -         ALS gebruiker WIL IK kunnen uitloggen ZODAT een ander gebruik kan maken van de applicatie
                </li>
                <li>[<a href='https://florisfeddema.atlassian.net/browse/PLAN-51'>PLAN-51</a>] -         ALS eigenaar WIL IK een bedrijf aan kunnen maken ZODAT ik hier gebruik van kunnen maken
                </li>
                <li>[<a href='https://florisfeddema.atlassian.net/browse/PLAN-53'>PLAN-53</a>] -         ALS eigenaar WIL IK het bedrijf kunnen aanpassen ZODAT deze up to date is
                </li>
                <li>[<a href='https://florisfeddema.atlassian.net/browse/PLAN-58'>PLAN-58</a>] -         ALS devops engineer WIL IK onderzoeken hoe een test omgeving kan opgezet worden ZODAT de applicatie ook in een testomgeving kan draaien
                </li>
                <li>[<a href='https://florisfeddema.atlassian.net/browse/PLAN-59'>PLAN-59</a>] -         ALS devops engineer WIL IK de webservice op kubernetes deployen ZODAT deze online draait
                </li>
                <li>[<a href='https://florisfeddema.atlassian.net/browse/PLAN-62'>PLAN-62</a>] -         ALS gebruiker WIL IK dat de namen van gebruikers geupdate worden in de companyservice ZODAT hier ook de correcte wijzigen in komen
                </li>
            </ul>

            <h2>        Bug
            </h2>
            <ul>
                <li>[<a href='https://florisfeddema.atlassian.net/browse/PLAN-63'>PLAN-63</a>] -         Deployment op development faalt
                </li>
                <li>[<a href='https://florisfeddema.atlassian.net/browse/PLAN-66'>PLAN-66</a>] -         Frontend NGINX routing op deployment
                </li>
                <li>[<a href='https://florisfeddema.atlassian.net/browse/PLAN-79'>PLAN-79</a>] -         Extra fields in user object uit login verwijderen
                </li>
                <li>[<a href='https://florisfeddema.atlassian.net/browse/PLAN-80'>PLAN-80</a>] -         Cors config in companyservice
                </li>
            </ul>

            <h2>        Sub-task
            </h2>
            <ul>
                <li>[<a href='https://florisfeddema.atlassian.net/browse/PLAN-8'>PLAN-8</a>] -         Functionele requirements
                </li>
                <li>[<a href='https://florisfeddema.atlassian.net/browse/PLAN-9'>PLAN-9</a>] -         Non functionele requirements
                </li>
                <li>[<a href='https://florisfeddema.atlassian.net/browse/PLAN-10'>PLAN-10</a>] -         C1
                </li>
                <li>[<a href='https://florisfeddema.atlassian.net/browse/PLAN-43'>PLAN-43</a>] -         Aanmaken repository
                </li>
                <li>[<a href='https://florisfeddema.atlassian.net/browse/PLAN-44'>PLAN-44</a>] -         Aanmaken gitignore
                </li>
                <li>[<a href='https://florisfeddema.atlassian.net/browse/PLAN-45'>PLAN-45</a>] -         Leeg project aanmaken
                </li>
                <li>[<a href='https://florisfeddema.atlassian.net/browse/PLAN-46'>PLAN-46</a>] -         Github Actions aanzetten
                </li>
                <li>[<a href='https://florisfeddema.atlassian.net/browse/PLAN-47'>PLAN-47</a>] -         Authenticatie Service
                </li>
                <li>[<a href='https://florisfeddema.atlassian.net/browse/PLAN-48'>PLAN-48</a>] -         Mobiele Service
                </li>
                <li>[<a href='https://florisfeddema.atlassian.net/browse/PLAN-49'>PLAN-49</a>] -         Web Service
                </li>
                <li>[<a href='https://florisfeddema.atlassian.net/browse/PLAN-60'>PLAN-60</a>] -         Companyservice
                </li>
                <li>[<a href='https://florisfeddema.atlassian.net/browse/PLAN-61'>PLAN-61</a>] -         Webservice
                </li>
                <li>[<a href='https://florisfeddema.atlassian.net/browse/PLAN-64'>PLAN-64</a>] -         RabbitMQ in Go
                </li>
                <li>[<a href='https://florisfeddema.atlassian.net/browse/PLAN-65'>PLAN-65</a>] -         RabbitMQ in .NET
                </li>
                <li>[<a href='https://florisfeddema.atlassian.net/browse/PLAN-67'>PLAN-67</a>] -         Bedrijf aanpassen in webservice
                </li>
                <li>[<a href='https://florisfeddema.atlassian.net/browse/PLAN-68'>PLAN-68</a>] -         Bedrijf aanpassen in companyservice
                </li>
            </ul></div>
    );
}

export default Home
