<html>
    <head>
        <title>PurifEye : Historique</title>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <meta charset="UTF-8"/>
        <link rel="stylesheet" href="style.css">
    </head>
    
    <body>
        <nav class="navbar">
            <div class="navbar-logo">
              <h1>PurifEye</h1>
            </div>
            <ul class="navbar-menu">
              <li><a href="#">Utilisateur</a></li>
              <li><a href="?tab=overview">Historique</a></li>
              <li><a href="#">Administrateur</a></li>
            </ul>
        </nav>

        <?php if (isset($_GET["tab"]) && !empty($_GET["tab"])) {
            $tab = $_GET["tab"];

            if ($tab == "overview") { ?>
                <canvas id="chart_all" style="width: 100%; height: 550px;"></canvas>
                <div class="tableau">
                    <div class = "capteur">
                        <img src="images/temp.png" alt="image">
                        <h2>Temperature</h2>
                        <p>
                            Température Relevée : 24°C
                        </p>
                        <button class="historique" id="temp_histo">Historique</button>
                    </div>
                    <div class = "capteur">
                        <img src="images/hum.png" alt="image">
                        <h2>Humidite</h2>
                        <p>
                            Humidité Relative : 25%<br>
                            Humidité Absolue : 1200 g/m³
                        </p>
                        <button class="historique" id="hum_histo">Historique</button>
                    </div>
                    <div class = "capteur">
                        <img src="images/co2.png" alt="image">
                        <h2>CO2</h2>
                        <p>
                            Valeur Relevée : 500ppm
                        </p>
                        <button class="historique" id="co2_histo">Historique</button>
                    </div>
                    <div class = "capteur">
                        <img src="images/no2.png" alt="image">
                        <h2>NO2</h2>
                        <p>
                            Valeur Relevée : 200ppm
                        </p>
                        <button class="historique" id="no2_histo">Historique</button>
                    </div>
                    <div class = "capteur">
                        <img src="images/cov.png" alt="image">
                        <h2>COV</h2>
                        <p>
                            Valeur Relevée : 1700ppb
                        </p>
                        <button class="historique" id="cov_histo">Historique</button>
                    </div>
                    <div class = "capteur">
                        <img src="images/pm.png" alt="image">
                        <h2>PM</h2>
                        <p>
                            Particules 2,5µm : 570µg/m³
                            Particules 5µm : 240µg/m³
                            Particules 10µm : 150µg/m³
                        </p>
                        <button class="historique" id="pm_histo">Historique</button>
                    </div>
                </div>

                <?php } elseif (
                $tab == "history" &&
                isset($_GET["type"]) &&
                !empty($_GET["type"])
            ) {
                $iType = $_GET["type"]; ?>
                    <div style="display: flex;">

                    <?php switch ($iType) {
                        case "temperature":
                            $unit = "°C";
                            break;
                        case "humidity":
                            $unit = "%";
                            break;
                        case "co2":
                            $unit = "ppm";
                            break;
                        case "no2":
                            $unit = "ppm";
                            break;
                        case "cov":
                            $unit = "ppb";
                            break;
                        case "pm":
                            $unit = "µg/m³";
                            break;
                    } ?>
                        <canvas id="chart" width="1200" height="600" style="margin-top: 50px; margin-right: 50px; margin-left: 50px;"></canvas>
                            <div style="display: flex; flex-direction: column; justify-content: center;">
                                <form id="filter-form" style="display: flex; align-items: center; margin-right: 50px; margin-top: 50px;" subtype=<?php echo '"' .
                                    $iType .
                                    '"'; ?>>
                                    <label for="select-start">Début</label>
                                    <select id="select-start" name="select-start" style="margin-right: 10px; padding: 5px; border-radius: 5px; border: 1px solid #a9c9ff;"></select>

                                    <label for="select-end">Fin</label>
                                    <select id="select-end" name="select-end" style="padding: 5px; border-radius: 5px; border: 1px solid #a9c9ff;"></select>
                                </form> 
                                <h3 style='font-family: "Poppins", sans-serif;'>Valeur Pic : <span class="formtext" id="peakvalue"></span><?php echo $unit; ?></h3>
                                <h3 style='font-family: "Poppins", sans-serif;'>Valeur Moyenne : <span id="avgvalue"></span><?php echo $unit; ?></h3>
                                <h3 style='font-family: "Poppins", sans-serif;'>Valeur Minimum : <span id="minvalue"></span><?php echo $unit; ?></h3>
                            </div>
                        </div>
                                    
                <?php
            }
        } ?>
    </body>
    <script>

        const temp_histo_btn = document.querySelector('#temp_histo');
        const hum_histo_btn = document.querySelector('#hum_histo');
        const co2_histo_btn = document.querySelector('#co2_histo');
        const no2_histo_btn = document.querySelector('#no2_histo');
        const cov_histo_btn = document.querySelector('#cov_histo');
        const pm_histo_btn = document.querySelector('#pm_histo');

        function temp_histo_clicked() {
            location.href = '?tab=history&type=temperature';
        }
		function hum_histo_clicked() {
            location.href = '?tab=history&type=humidity';
        }
		function co2_histo_clicked() {
            location.href = '?tab=history&type=co2';
        }
		function no2_histo_clicked() {
            location.href = '?tab=history&type=no2';
        }
		function cov_histo_clicked() {
            location.href = '?tab=history&type=cov';
        }
		function pm_histo_clicked() {
            location.href = '?tab=history&type=pm';
        }
		
		if(temp_histo_btn)
			temp_histo_btn.addEventListener("click", temp_histo_clicked);
        if(hum_histo_btn)
			hum_histo_btn.addEventListener("click", hum_histo_clicked);
        if(co2_histo_btn)
			co2_histo_btn.addEventListener("click", co2_histo_clicked);
        if(no2_histo_btn)
			no2_histo_btn.addEventListener("click", no2_histo_clicked);           
        if(cov_histo_btn)
			cov_histo_btn.addEventListener("click", cov_histo_clicked);
        if(pm_histo_btn)
			pm_histo_btn.addEventListener("click", pm_histo_clicked);

        window.addEventListener('load', function() {
            var capteurs = document.querySelectorAll('.capteur');
            for (var i = 0; i < capteurs.length; i++) {
                capteurs[i].classList.add('fade-in');
                capteurs[i].classList.add('fade-in-translate');
            }
        });

        


    </script>
    <script src="histo.js"></script>
    <?php
    if($tab == "overview"){
        ?>  
            <script src="all_histo.js"></script>
        <?php
    }
    ?>
    
</html>