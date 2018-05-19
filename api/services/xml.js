import xmldoc from 'xmldoc';
import axios from 'axios';

class XmlService {
  static async fetchStoreXml(url) {
    let xmlDoc;

    try {
      const { data } = await axios.get(url);
      xmlDoc = new xmldoc.XmlDocument(data.toString());
    } catch (err) {
      console.log(err);
    }

    return xmlDoc;
  }

  static async parseDocumentForProducts(xmlDoc) {
    return xmlDoc.children.filter(child => child.name === 'Product');
  }
}

export default XmlService;
