	var txt = "";
	var mapErrorHandler = function(msg, url, l) {
		txt = "There was an error on this page.\n\n"
		txt += "Error: " + msg + "\n"
		txt += "URL: " + url + "\n"
		txt += "Line: " + l + "\n\n"
		txt += "Click OK to continue.\n\n"
		alert(txt)
		return true;
	}
	var map, infoWindow;
	var markers = [];

	// 创建标记集合
	var locations = [{
			title: '天安门',
			position: [116.39756, 39.908808]
		},
		{
			title: '前门',
			position: [116.397994, 39.900085]
		},
		{
			title: '天坛公园',
			position: [116.410886, 39.881998]
		},
		{
			title: '颐和园',
			position: [116.272852, 39.992273]
		},
		{
			title: '鸟巢',
			position: [116.396203, 39.993575]
		}
	];

	function init() {
		// 创建地图对象
		map = new AMap.Map('map', {
			center: [116.397428, 39.90923],
			zoom: 11
		});

		// 添加 工具条
		//      map.plugin(["AMap.ToolBar"], function() {
		//          map.addControl(new AMap.ToolBar());
		//      });
		// 创建 默认信息窗体
		infoWindow = new AMap.InfoWindow({
			offset: new AMap.Pixel(0, -30)
		});

		var currentviewModle = new viewModle();
		ko.applyBindings(currentviewModle);
		$("#menu").click(function() {
			$(".options-box").fadeToggle();
		});

	}

	var viewModle = function() {
		var self = this;
		self.NameList = ko.observableArray(["天安门", "前门", "天坛公园", "颐和园", "鸟巢"]);
		self.Name = ko.observable("");
		self.ChosseName = ko.computed(function() {
			if(!self.Name()) {
				return locations;
			} else {
				return locations.filter(function(location) {
					location.title === self.Name();
					for (var x in locations) {
					    if (locations[x].title.toLowerCase().indexOf(self.Name().toLowerCase()) >= 0) {
					        markers[x].show();
					    } else {
					        markers[x].hide();
					    }
					}
				});

			}
		});

		// 添加标记并绑定标记事件
		for(var i = 0; i < locations.length; i++) {
			var position = locations[i].position;
			var title = locations[i].title;
			//创建marker
			var marker = new AMap.Marker({
				map: map,
				position: position,
				title: title,
				offset: new AMap.Pixel(-12, -36)
			});

			markers.push(marker);
			//markers[i].setMap(map);
			marker.content = '这里是' + title;
			marker.on('click', markerClick);
			marker.setAnimation('AMAP_ANIMATION_DROP');

		}
		// 点击事件方法主体
		function markerClick(e) {
			infoWindow.setContent(e.target.content);
			infoWindow.open(map, e.target.getPosition());
		}

		$.ajax({
			url: "https://www.youtube.com/iframe_api",
			//dataType:"jsonp",
			context: document.body,
			statusCode: {
				404: function() {
					alert("page not found");
				}
			}
		}).done(function() {
			$(this).css("banckground", "red");
		});

	}