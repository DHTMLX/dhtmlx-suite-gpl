function getTextData(itemsAmount) {
	var result = [];
	for (var i=0; i<itemsAmount; i++){
		result.push({value: i + " item" });
	}
	return result
}


function template(item) {
	var template = "<div class='list_item'>";
	template += "<div class='item_name'>"+item.value;
	
	template+="<span class='item_author'> by "
	template += item.authors.filter(function(item){return item}).join(", ");
	template += item.publishedDate ? ", " + new Date(item.publishedDate.$date).getFullYear() : "";
	template += "</span>";
	template += "</div>";
	
	template += "<div class='item_categories'>"+item.categories.join(", ")+"</div>";
	template += "</div>";
	return template;
}