var loremIpsum = "magna ac placerat vestibulum lectus mauris ultrices eros in cursus turpis massa tincidunt dui ut ornare lectus sit amet est placerat in egestas erat imperdiet sed euismod nisi porta lorem mollis aliquam ut porttitor leo a diam sollicitudin tempor id eu nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit amet risus nullam eget felis eget nunc lobortis mattis aliquam faucibus purus in massa tempor nec feugiat nisl pretium fusce id velit ut tortor pretium viverra suspendisse potenti nullam ac tortor vitae purus faucibus ornare suspendisse sed nisi lacus sed viverra tellus in hac habitasse platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at augue eget arcu dictum varius duis at consectetur lorem donec massa sapien faucibus et molestie ac feugiat sed lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare massa eget egestas purus viverra accumsan in nisl nisi scelerisque eu ultrices vitae auctor eu augue ut lectus arcu bibendum at varius vel pharetra vel turpis nunc eget lorem dolor sed viverra ipsum nunc aliquet bibendum enim facilisis gravida neque convallis a cras semper auctor neque vitae tempus quam pellentesque nec nam aliquam sem et tortor consequat id porta nibh venenatis cras sed felis eget velit aliquet sagittis id consectetur purus ut faucibus pulvinar elementum integer enim neque volutpat ac tincidunt vitae semper quis lectus nulla at volutpat diam ut venenatis tellus in metus vulputate eu scelerisque felis imperdiet proin fermentum leo vel orci porta non pulvinar neque laoreet suspendisse interdum consectetur libero id faucibus nisl tincidunt eget nullam non nisi est sit amet facilisis magna etiam tempor orci eu lobortis elementum nibh tellus molestie nunc non blandit massa enim nec dui nunc mattis enim ut tellus elementum sagittis vitae et leo duis ut diam quam nulla porttitor massa id neque aliquam vestibulum morbi blandit cursus risus at ultrices mi tempus imperdiet nulla malesuada pellentesque elit eget gravida cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies leo integer malesuada nunc vel risus commodo viverra maecenas accumsan lacus vel facilisis volutpat est velit egestas dui id ornare arcu odio ut sem nulla pharetra diam sit amet nisl suscipit adipiscing bibendum est ultricies integer quis auctor elit sed vulputate mi sit amet mauris commodo quis imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada proin libero nunc consequat interdum varius sit amet mattis vulputate enim nulla aliquet porttitor lacus luctus accumsan tortor posuere ac ut consequat semper viverra nam libero justo laoreet sit amet cursus sit amet dictum sit amet justo donec enim diam vulputate ut pharetra sit amet aliquam id diam maecenas ultricies mi eget mauris pharetra et ultrices neque ornare aenean euismod elementum nisi quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna neque viverra justo nec ultrices dui sapien eget mi proin sed libero enim sed faucibus turpis in eu mi bibendum neque egestas congue quisque egestas diam in arcu cursus euismod quis viverra nibh cras pulvinar mattis nunc".split(" ");

var CreateTable = function (mainContainerID, nbLignes, nbColonnes, nbHLignes) {
	this.container = document.getElementById(mainContainerID);
	this.headerContainer = document.getElementById("headerContainer");
	this.bodyContainer = document.getElementById("bodyContainer");
	this.nbLignes = nbLignes ? nbLignes : 0;
	this.nbColonnes = nbColonnes ? nbColonnes : 0;
	this.nbHLignes = nbHLignes ? nbHLignes : 0;

	this.ticking = false;
};

/**
 * Function that create the main table
 */
CreateTable.prototype.generate = function () {
	//Clear le container
	this.clear();
	//Crée les tables
	this.headerTable = document.createElementSpec("table", ["headerTable"]);
	this.bodyTable = document.createElementSpec("table", ["bodyTable"]);
	//Charge les tables
	for (var i = 0; i < this.nbHLignes; ++i) {
		var ligne = this.headerTable.insertRow();
		for (var j = 0; j < this.nbColonnes; ++j) {
			var cell = ligne.insertCell();
			cell.innerText = loremIpsum[(i + j) % loremIpsum.length];
		}
	}
	for (var i = 0; i < this.nbLignes; ++i) {
		var ligne = this.bodyTable.insertRow();
		for (var j = 0; j < this.nbColonnes; ++j) {
			var cell = ligne.insertCell();
			cell.innerText = loremIpsum[(i + j) % loremIpsum.length];
		}
	}
	//On ajoute les tables dans les containers
	this.headerContainer.appendChild(this.headerTable);
	this.bodyContainer.appendChild(this.bodyTable);
	//Onsynchronise la taille du container
	this.syncSize();
	//On synchronise les largeurs de cellule
	this.syncWidth();
};
/**
 * Function that clear the main container
 */
CreateTable.prototype.clear = function () {
	this.headerContainer.clear();
	this.bodyContainer.clear();
};

CreateTable.prototype.syncSize = function () {
	var hHeight = this.headerContainer.offsetHeight;
	this.bodyContainer.style.top = hHeight + "px";
};

CreateTable.prototype.syncWidth = function () {
	for (var i = 0; i < this.nbColonnes; ++i) {
		this.syncWidthCol(i);
	}
};


CreateTable.prototype.syncWidthCol = function (index) {
	var hWidth = this.headerTable.rows[0].cells[index].offsetWidth;
	var bWidth = this.bodyTable.rows[0].cells[index].offsetWidth;
	var maxVal = (hWidth > bWidth ? hWidth : bWidth);
	for (var i = 0; i < this.headerTable.rows.length; ++i) {
		this.headerTable.rows[i].cells[index].style.minWidth = maxVal + "px";
	}
	for (var i = 0; i < this.bodyTable.rows.length; ++i) {
		this.bodyTable.rows[i].cells[index].style.minWidth = maxVal + "px";
	}
};

CreateTable.prototype.onScrollContainer = function () {
	var offset = this.container.scrollTop;

	if (!this.ticking) {
		var saveMe = this;
		window.requestAnimationFrame(function () {
			saveMe.changeTopPos(offset);
			saveMe.ticking = false;
		})
	}
	this.ticking = true;
}

CreateTable.prototype.changeTopPos = function (offset) {
	this.headerContainer.style.top = offset + "px"
}

HTMLElement.prototype.clear = function () {
	while (this && this.lastElementChild) {
		this.removeChild(this.lastElementChild);
	}
};

Document.prototype.createElementSpec = function (tag, classlist, style, innerhtml, value) {
	var ret = this.createElement(tag);
	ret.style = (style ? style : "");
	if (classlist && classlist instanceof Array && classlist.length > 0) {
		classlist.forEach(function (e) {
			ret.className += e;
		});
	}
	ret.innerHtml = (innerhtml ? innerhtml : "");
	ret.value = (value ? value : "");
	return ret;
};