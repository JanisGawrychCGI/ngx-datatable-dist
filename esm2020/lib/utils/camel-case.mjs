/**
 * Converts strings from something to camel case
 * http://stackoverflow.com/questions/10425287/convert-dash-separated-string-to-camelcase
 */
export function camelCase(str) {
    // Replace special characters with a space
    str = str.replace(/[^a-zA-Z0-9 ]/g, ' ');
    // put a space before an uppercase letter
    str = str.replace(/([a-z](?=[A-Z]))/g, '$1 ');
    // Lower case first character and some other stuff
    str = str
        .replace(/([^a-zA-Z0-9 ])|^[0-9]+/g, '')
        .trim()
        .toLowerCase();
    // uppercase characters preceded by a space or number
    str = str.replace(/([ 0-9]+)([a-zA-Z])/g, function (a, b, c) {
        return b.trim() + c.toUpperCase();
    });
    return str;
}
/**
 * Converts strings from camel case to words
 * http://stackoverflow.com/questions/7225407/convert-camelcasetext-to-camel-case-text
 */
export function deCamelCase(str) {
    return str.replace(/([A-Z])/g, match => ` ${match}`).replace(/^./, match => match.toUpperCase());
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FtZWwtY2FzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N3aW1sYW5lL25neC1kYXRhdGFibGUvc3JjL2xpYi91dGlscy9jYW1lbC1jYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7R0FHRztBQUNILE1BQU0sVUFBVSxTQUFTLENBQUMsR0FBVztJQUNuQywwQ0FBMEM7SUFDMUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDekMseUNBQXlDO0lBQ3pDLEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLG1CQUFtQixFQUFFLEtBQUssQ0FBQyxDQUFDO0lBRTlDLGtEQUFrRDtJQUNsRCxHQUFHLEdBQUcsR0FBRztTQUNOLE9BQU8sQ0FBQywwQkFBMEIsRUFBRSxFQUFFLENBQUM7U0FDdkMsSUFBSSxFQUFFO1NBQ04sV0FBVyxFQUFFLENBQUM7SUFFakIscURBQXFEO0lBQ3JELEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLHNCQUFzQixFQUFFLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO1FBQ3pELE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNwQyxDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQztBQUVEOzs7R0FHRztBQUNILE1BQU0sVUFBVSxXQUFXLENBQUMsR0FBVztJQUNyQyxPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztBQUNuRyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENvbnZlcnRzIHN0cmluZ3MgZnJvbSBzb21ldGhpbmcgdG8gY2FtZWwgY2FzZVxyXG4gKiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzEwNDI1Mjg3L2NvbnZlcnQtZGFzaC1zZXBhcmF0ZWQtc3RyaW5nLXRvLWNhbWVsY2FzZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNhbWVsQ2FzZShzdHI6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgLy8gUmVwbGFjZSBzcGVjaWFsIGNoYXJhY3RlcnMgd2l0aCBhIHNwYWNlXHJcbiAgc3RyID0gc3RyLnJlcGxhY2UoL1teYS16QS1aMC05IF0vZywgJyAnKTtcclxuICAvLyBwdXQgYSBzcGFjZSBiZWZvcmUgYW4gdXBwZXJjYXNlIGxldHRlclxyXG4gIHN0ciA9IHN0ci5yZXBsYWNlKC8oW2Etel0oPz1bQS1aXSkpL2csICckMSAnKTtcclxuXHJcbiAgLy8gTG93ZXIgY2FzZSBmaXJzdCBjaGFyYWN0ZXIgYW5kIHNvbWUgb3RoZXIgc3R1ZmZcclxuICBzdHIgPSBzdHJcclxuICAgIC5yZXBsYWNlKC8oW15hLXpBLVowLTkgXSl8XlswLTldKy9nLCAnJylcclxuICAgIC50cmltKClcclxuICAgIC50b0xvd2VyQ2FzZSgpO1xyXG5cclxuICAvLyB1cHBlcmNhc2UgY2hhcmFjdGVycyBwcmVjZWRlZCBieSBhIHNwYWNlIG9yIG51bWJlclxyXG4gIHN0ciA9IHN0ci5yZXBsYWNlKC8oWyAwLTldKykoW2EtekEtWl0pL2csIGZ1bmN0aW9uIChhLCBiLCBjKSB7XHJcbiAgICByZXR1cm4gYi50cmltKCkgKyBjLnRvVXBwZXJDYXNlKCk7XHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiBzdHI7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDb252ZXJ0cyBzdHJpbmdzIGZyb20gY2FtZWwgY2FzZSB0byB3b3Jkc1xyXG4gKiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzcyMjU0MDcvY29udmVydC1jYW1lbGNhc2V0ZXh0LXRvLWNhbWVsLWNhc2UtdGV4dFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGRlQ2FtZWxDYXNlKHN0cjogc3RyaW5nKTogc3RyaW5nIHtcclxuICByZXR1cm4gc3RyLnJlcGxhY2UoLyhbQS1aXSkvZywgbWF0Y2ggPT4gYCAke21hdGNofWApLnJlcGxhY2UoL14uLywgbWF0Y2ggPT4gbWF0Y2gudG9VcHBlckNhc2UoKSk7XHJcbn1cclxuIl19