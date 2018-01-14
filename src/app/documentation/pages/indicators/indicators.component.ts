import { Component, OnInit } from '@angular/core';
import { MetaService } from '../../../helpers/meta/meta.service'

@Component({
	selector: 'app-indicators',
	templateUrl: './indicators.component.html',
	styleUrls: ['../../documentation.component.scss'],
})
export class IndicatorsComponent implements OnInit {

	public body = `
# INDICATORS

LED Indicators explained

| STATUS                   | COMMAND | DESCRIPTION
|--------------------------|---------|----------------
| Device Start Up			| welcome | Fade on/off white light
| Device paired with BLE 	| isPaired  | Fade on/off blue light
| Downloading video		    | isDownloading | White flash on/off continuous
| Device done downloading   | done | Clears any LED activity
| Button pressed while paired | buttonPress | Green on one time
| Button pressed while not connnected | buttonPressOffline | Red on one time
| Error has been caused 	| error | Red on

NOTE:

* **Done** (Reset) is not working at this time

You may test/run the LED by executing at command line

	sudo python /home/Cardigan/modules/indicators/python/states/standalone.py <cmd>

`
	
	constructor(private meta: MetaService) {
	}

}
