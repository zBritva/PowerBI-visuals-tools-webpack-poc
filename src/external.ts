/*
 *  Power BI Visual CLI
 *
 *  Copyright (c) Microsoft Corporation
 *  All rights reserved.
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the ""Software""), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */
"use strict";

import powerbi from './../node_modules/poc-powerbi-visuals-api/PowerBI-visuals';

import * as d3selection from 'd3-selection'
// import * as settings from './settings';
// import VisualSettings = settings.VisualSettings;

import IVisual = powerbi.extensibility.visual.IVisual;
import IVisualHost = powerbi.extensibility.visual.IVisualHost;
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import VisualObjectInstance = powerbi.VisualObjectInstance;
import DataView = powerbi.DataView;
import EnumerateVisualObjectInstancesOptions = powerbi.EnumerateVisualObjectInstancesOptions;
import VisualObjectInstanceEnumerationObject = powerbi.VisualObjectInstanceEnumerationObject;

export default class VisualInExternalModule implements IVisual {
    private target: HTMLElement;
    private updateCount: number;
    // private settings: VisualSettings;
    private textNode: Text;
    private visualHost: IVisualHost;
    constructor(options: VisualConstructorOptions) {
        this.visualHost = options.host;
        console.log('Visual constructor', options);
        this.target = options.element;

        let div = document.createElement("div");
        div.setAttribute("class", "main");
        div.textContent = "IT IS THE VISUAL IN MODERN MODULE STYLE";
        this.target.appendChild(div);
    }

    public update(options: VisualUpdateOptions) {
        console.log("update");
       
        if (
            options.dataViews[0] &&
            options.dataViews[0].categorical &&
            options.dataViews[0].categorical.categories &&
            options.dataViews[0].categorical.categories[0] &&
            options.dataViews[0].categorical.categories[0].values
        ) {
            debugger;
            let categories = options.dataViews[0].categorical.categories[0].values;

            var paragraph = 
                d3selection
                .select("div.main")
                .selectAll("p");

            let data = 
                paragraph
                .data(categories);

            let entering = 
                data
                .enter();

            let p = entering
                .append("p")
                
            p.text(d => d.toString());


            data.exit().remove();
        }
    }
    public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstance[] | VisualObjectInstanceEnumerationObject {
        return [];
    }
}