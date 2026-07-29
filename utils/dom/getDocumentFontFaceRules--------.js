function Index(doc) {
  const fonts = [];
  for (const sheet of doc.styleSheets) {
    try {
      for (const rule of sheet.cssRules) {
        if (rule.type === CSSRule.FONT_FACE_RULE) {
          fonts.push({
            family: rule.style.getPropertyValue("font-family"),
            src: rule.style.getPropertyValue("src"),
            weight: rule.style.getPropertyValue("font-weight") || "400",
            style: rule.style.getPropertyValue("font-style") || "normal"
          });          
        }
      }
    } catch (e) {
        console.log(e);
    }
  }

  return fonts;
}

export default Index;