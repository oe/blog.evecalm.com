const adCode = `
<ins
  class="adsbygoogle"
  style="display:block"
  data-ad-client="ca-pub-2280645987761425"
  data-ad-slot="4096334703"
  data-ad-format="auto"
  data-full-width-responsive="true"></ins>
`;

// remark-insert-ad.js
export default function remarkInsertAd() {
  return (tree) => {
    let paragraphCount = 0;
    const adNode = {
      type: 'html',
      value: adCode
    };
    if (tree.children.length < 2) {
      tree.children.push(adNode); // 如果没有第二个段落，直接末尾追加
    } else {
      tree.children = tree.children.flatMap((node, index) => {
        if (node.type === 'paragraph') {
          paragraphCount++;
          if (paragraphCount === 2) {
            return [node, adNode]; // 在第二个段落后插入
          }
        }
        return [node];
      });
    }

  };
}
