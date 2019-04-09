module.exports = {
    convertMarkdownToHtml: function(markdown) {
        var lines = splitInput(markdown);
        var html = '';
        lines.forEach(line => {
            if (line != '') {
                if (hasLink(line)) {
                    line = convertLinks(line);
                }
                if (hasHeader(line)) {
                    line = replaceHeader(line);
                } else {
                    line = addParagraph(line);
                }

                html += line;
            }
        });
        return html;
    }
}

const regex = /\[(.+?)\]\((https?:\/\/[a-zA-Z0-9/.(]+?)\)/g;

function splitInput(markdown) {
    if (markdown.indexOf('\r\n') != -1) {
        return markdown.split('\r\n');
    } else if (markdown.indexOf('\n') != -1) {
        return markdown.split('\n');
    } else {
        return markdown.split('\r');
    }
}

function convertLinks(line) {
    return line.replace(regex, '<a href="$2">$1</a>');
}

function hasHeader(line) {
    return line[0] == '#';
}

function hasLink(line) {
    return regex.test(line);
}

function replaceHeader(line) {
    var depth = 1;
    while (depth < 6 && line.length >= depth) {
        if (line[depth] != '#') {
            return replaceHashWithHeader(line, depth);
        }
        depth++;
    }
    return replaceHashWithHeader(line, depth);
}

function replaceHashWithHeader(line, depth) {
    line = line.substring(depth).trimLeft();
    return `<h${depth}>${line}</h${depth}>`;
}

function addParagraph(line) {
    return `<p>${line}</p>`;
}
