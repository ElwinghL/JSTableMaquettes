var loremIpsum = "magna ac placerat vestibulum lectus mauris ultrices eros in cursus turpis massa tincidunt dui ut ornare lectus sit amet est placerat in egestas erat imperdiet sed euismod nisi porta lorem mollis aliquam ut porttitor leo a diam sollicitudin tempor id eu nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit amet risus nullam eget felis eget nunc lobortis mattis aliquam faucibus purus in massa tempor nec feugiat nisl pretium fusce id velit ut tortor pretium viverra suspendisse potenti nullam ac tortor vitae purus faucibus ornare suspendisse sed nisi lacus sed viverra tellus in hac habitasse platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at augue eget arcu dictum varius duis at consectetur lorem donec massa sapien faucibus et molestie ac feugiat sed lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare massa eget egestas purus viverra accumsan in nisl nisi scelerisque eu ultrices vitae auctor eu augue ut lectus arcu bibendum at varius vel pharetra vel turpis nunc eget lorem dolor sed viverra ipsum nunc aliquet bibendum enim facilisis gravida neque convallis a cras semper auctor neque vitae tempus quam pellentesque nec nam aliquam sem et tortor consequat id porta nibh venenatis cras sed felis eget velit aliquet sagittis id consectetur purus ut faucibus pulvinar elementum integer enim neque volutpat ac tincidunt vitae semper quis lectus nulla at volutpat diam ut venenatis tellus in metus vulputate eu scelerisque felis imperdiet proin fermentum leo vel orci porta non pulvinar neque laoreet suspendisse interdum consectetur libero id faucibus nisl tincidunt eget nullam non nisi est sit amet facilisis magna etiam tempor orci eu lobortis elementum nibh tellus molestie nunc non blandit massa enim nec dui nunc mattis enim ut tellus elementum sagittis vitae et leo duis ut diam quam nulla porttitor massa id neque aliquam vestibulum morbi blandit cursus risus at ultrices mi tempus imperdiet nulla malesuada pellentesque elit eget gravida cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies leo integer malesuada nunc vel risus commodo viverra maecenas accumsan lacus vel facilisis volutpat est velit egestas dui id ornare arcu odio ut sem nulla pharetra diam sit amet nisl suscipit adipiscing bibendum est ultricies integer quis auctor elit sed vulputate mi sit amet mauris commodo quis imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada proin libero nunc consequat interdum varius sit amet mattis vulputate enim nulla aliquet porttitor lacus luctus accumsan tortor posuere ac ut consequat semper viverra nam libero justo laoreet sit amet cursus sit amet dictum sit amet justo donec enim diam vulputate ut pharetra sit amet aliquam id diam maecenas ultricies mi eget mauris pharetra et ultrices neque ornare aenean euismod elementum nisi quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna neque viverra justo nec ultrices dui sapien eget mi proin sed libero enim sed faucibus turpis in eu mi bibendum neque egestas congue quisque egestas diam in arcu cursus euismod quis viverra nibh cras pulvinar mattis nunc".split(" ");

var CreateTable = function (mainContainerID, nbLignes, nbColonnes, nbHLignes, nbCtF) {
	this.container = document.getElementById(mainContainerID);
	this.headerContainer = document.getElementById("headerContainer");
	this.bodyContainer = document.getElementById("bodyContainer");
	this.panelContainer = document.getElementById("panelContainer");
	this.topLeftContainer = document.getElementById("topLeftContainer");
	this.nbLignes = nbLignes ? nbLignes : 0;
	this.nbColonnes = nbColonnes ? nbColonnes : 0;
	this.nbHLignes = nbHLignes ? nbHLignes : 0;
	this.nbCtF = nbCtF ? nbCtF : 0;

	this.loremIpsum = function (index) {
		return loremIpsum[index % loremIpsum.length];
	};

	this.bodyContainer.addEventListener("scroll", function () {
		this.headerContainer.scrollLeft = this.bodyContainer.scrollLeft;
		this.panelContainer.scrollTop = this.bodyContainer.scrollTop;
	}.bind(this), false);
};

/**
 * Function that create the main table
 */
CreateTable.prototype.generate = function () {
	//Clear le container
	this.clear();
	//#region Crée les tables
	//#region Body
	var table = this.createTheMainTable();
	this.bodyContainer.appendChild(table);
	this.bodyTable = table;
	//#endregion
	//#region Header
	var headerTable = document.createElementSpec("table", ["headerTable"]);
	this.headerContainer.appendChild(headerTable);
	this.headerTable = headerTable;
	//#endregion
	//#region Panels
	var panelTable = document.createElementSpec("table", ["panelTable"]);
	this.panelTable = panelTable;
	this.panelContainer.appendChild(panelTable);
	//#endregion
	//#region 
	var topLeftTable = document.createElementSpec("table", ["topLeftTable"]);
	this.topLeftTable = topLeftTable;
	this.topLeftContainer.appendChild(topLeftTable);
	//#endregion
	//#endregion
	//Onsynchronise la taille du container
	this.syncSize();
	//On synchronise les largeurs de cellule
	this.syncWidth();
	//On clone les cellules figées
	this.cloneFixedCells();
};

CreateTable.prototype.createTheMainTable = function () {
	var table = document.createElementSpec("table", ["bodyTable"]);
	for (var i = 0; i < this.nbLignes || i < this.nbHLignes; ++i) {
		var header = hLine = tBody = line = null;
		if (i < this.nbHLignes) {
			header = table.createTHead() // Create if none or return the existing one
			hLine = header.insertRow();
		}
		if (i < this.nbLignes) {
			if (table.tBodies.length > 0) {
				tBody = table.tBodies[0];
			} else {
				tBody = document.createElement("tbody");
				table.appendChild(tBody);
			}
			line = tBody.insertRow();
		}
		for (var j = 0; j < this.nbColonnes; ++j) {
			if (hLine) {
				var hCell = document.createElementSpec("th", null, null, this.loremIpsum(i + j));
				hLine.appendChild(hCell);
			}
			if (line) {
				var cell = line.insertCell();
				cell.innerHTML = this.loremIpsum(i + j);
			}

		}
	}
	return table;
};

CreateTable.prototype.cloneFixedCells = function () {
	//#region HeaderTable
	this.headerTable.appendChild(this.bodyTable.createTHead().cloneNode(true));
	//#endregion
	//#region PanelTable
	var pHead = this.panelTable.createTHead();
	var pBody = document.createElement("tbody");
	this.panelTable.appendChild(pBody);
	if (this.nbCtF) {
		for (var i = 0; i < this.nbLignes || i < this.nbHLignes; ++i) {
			var hLine = tBody = line = null;
			if (i < this.nbHLignes) {
				hLine = pHead.insertRow();
			}
			if (i < this.nbLignes) {
				line = pBody.insertRow();
			}
			for (var j = 0; j < this.nbCtF; ++j) {
				if (hLine) {
					var hCell = this.bodyTable.createTHead().rows[i].cells[j].cloneNode(true);
					hLine.appendChild(hCell);
				}
				if (line) {
					var cell = this.bodyTable.tBodies[0].rows[i].cells[j].cloneNode(true);
					line.appendChild(cell);
				}

			}
		}
	}
	this.topLeftTable.appendChild(pHead.cloneNode(true));
	//#endregion
}
/**
 * Function that clear the main container
 */
CreateTable.prototype.clear = function () {
	this.headerContainer.clear();
	this.bodyContainer.clear();
	this.panelContainer.clear();
	this.topLeftContainer.clear();
};

CreateTable.prototype.syncSize = function () {
	var width = this.container.offsetWidth;
	var height = this.container.offsetHeight;

	this.headerContainer.style.cssText = "width:" + (width - 17) + "px;";
	this.bodyContainer.style.cssText = "width:" + width + "px;height:" + height + "px;";
	this.panelContainer.style.cssText = "height:" + (height - 17) + "px;";
};

CreateTable.prototype.syncWidth = function () {
	for (var i = 0; i < this.nbColonnes; ++i) {
		this.syncWidthCol(i);
	}
};


CreateTable.prototype.syncWidthCol = function (index) {
	var hWidth = this.bodyTable.createTHead().rows[0].cells[index].offsetWidth;
	var bWidth = this.bodyTable.tBodies[0].rows[0].cells[index].offsetWidth;
	var maxVal = (hWidth > bWidth ? hWidth : bWidth);
	for (var i = 0; i < this.bodyTable.rows.length; ++i) {
		this.bodyTable.rows[i].cells[index].style.minWidth = maxVal + "px";
	}
};

CreateTable.prototype.changeTopPos = function (offset) {
	this.headerContainer.style.top = offset + "px"
}

Document.prototype.createElementSpec = function (tag, classlist, style, innerhtml, value) {
	var ret = this.createElement(tag);
	if (classlist && classlist instanceof Array && classlist.length > 0) {
		classlist.forEach(function (e) {
			ret.className += e;
		});
	}
	if (style)
		ret.style = style;
	if (innerhtml)
		ret.innerHTML = innerhtml;
	if (value)
		ret.value = value;
	return ret;
};

HTMLElement.prototype.clear = function () {
	while (this.lastElementChild) {
		this.removeChild(this.lastElementChild);
	}
}

function test() {
	alert("T'as cliqué sur le header");
}