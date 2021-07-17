# twtable

Reactjs table module

### Why to use twtable module ?

<ul>
<li>
Client-side Pagination
</li>
<li>
Server-side Pagination
</li>
<li>
Search filter
</li>
<li>
Download option excel, csv
</li>
<li>
support custom styling
</li>
</ul>

### Steps to configure twtable in project

<ul>
<li>
Import twtable in project repository

```javascript
import TWTable from "@twister19/twtable";
```

</li>
<li>
Adding table view

```html
<TWTable
  headers="{headers}"
  data="{data}"
  filter="{true}"
  pagination="{true}"
  pageSize="{4}"
  heading="Demo Table"
/>
```

</li>
<li>
headers and data are only two required attributes. In headers attribute twtable requires header struture if the table and data attribute is used for data set input.

<ul>
<li>

```json
const headers = [{"column": "name","displayname": "Name", "display": true},
{"column": "job","displayname": "Job", "display": true},
{"column": "department","displayname": "Depertment", "display": true},
{"column": "team","displayname": "Team Strenth", "display": true},
{"column": "empId", "display":false},
{"button": true, "displayname":"Button1", "display":true, "column":buttonClicked}];
```

**Headers attributes**

<table border=1 width=100% style="margin:10px 0;">
<tr>
<th width="20%">Attribute</th>
<th width=10%>Require</th>
<th>Describtion</th>
</tr>
<tr>
<td>Column</td>
<td>true</td>
<td>The Column value should be same as one of the attribute name in 'data'. And in case of button or link it should be evet object.</td>
</tr>
<tr>
<td>displayname</td>
<td>false</td>
<td>Disply header of the column</td>
</tr>
<tr>
<td>display</td>
<td>true</td>
<td>if True, Column will be displayed.</td>
</tr>
<tr>
<td>button</td>
<td>false</td>
<td>This attribute should be added for button or link column.

_NOTE: There can be multiple button type columns in a table_

</td>
</tr>
</table>

</li>
<li>

```json
const data = [{"name":"Ashish", "job":"SoftWare Engineer", "department":"MB", "team":3, "empId":1},
{"name":"Nishant","job":"Business","department":"Data2C", "team":4, "empId":2},
{"name":"Mukesh","job":"Banker","department":"Data2C", "team":5, "empId":3},
{"name":"Shashi","job":"Home Maker","department":"Data2C", "team":7, "empId":4},
{"name":"Kanika","job":"Business","department":"Data2C", "team":9, "empId":5}];
```

<h3>Client side Paging Example</h3> 
<a href="https://codesandbox.io/s/twtable-clientside-paging-example-1mhgm?fontsize=14&hidenavigation=1&theme=dark">
  <img alt="Edit twtable-clientside-paging-example" src="https://codesandbox.io/static/img/play-codesandbox.svg">
</a>

</li>
</ul>
</li>

<li>TWTable tag attributes

<table border=1 width=100% style="margin:10px 0;">
<tr>
<th width="20%">Attribute</th>
<th width=10%>Require</th>
<th>Describtion</th>
<th>Version support</th>
</tr>
<tr>
<td>headers</td>
<td>true</td>
<td>Json, As described in above point</td>
<td>1.5.4 + </td>
</tr>
<tr>
<td>data</td>
<td>true</td>
<td>Json OR Function, JSON for client-side pagination and Function for Server-side pagination</td>
<td>1.5.4 + </td>
</tr>
<tr>
<td>pagination</td>
<td>false</td>
<td>Boolean, defualt value false. True for adding pagination in table</td>
<td>1.5.4 + </td>
</tr>
<tr>
<td>filter</td>
<td>false</td>
<td>Boolean, defualt value false. True for adding serach box in table.</td>
<td>1.5.4 + </td>
</tr>
<tr>
<td>tableClass</td>
<td>false</td>
<td>String, Can add custom CSS to table using classes</td>
<td>1.5.4 + </td>
</tr>
<tr>
<td>serversidePagination</td>
<td>false</td>
<td>Boolean, if true table will fetch data from API</td>
<td>1.5.4 + </td>
</tr>
<tr>
<td>defaultstyle</td>
<td>false</td>
<td>Boolean, Default value true. If false twtable will include default css</td>
<td>1.5.4 + </td>
</tr>
<tr>
<td>heading</td>
<td>false</td>
<td>String, Table heading</td>
<td>1.5.4 + </td>
</tr>
<tr>
<td>pageoption</td>
<td>false</td>
<td>Array, array of number</td>
<td>1.5.4 + </td>
</tr>
<tr>
<td>downloadableConfig</td>
<td>false</td>
<td>JSON, three optional attributes
<table border=1 width=100% margin="0">
<tr>
<th>
Attribute
</td>
<th>
Description
</td>
</tr>
<tr>
<td>
download
</td>
<td>
Boolean, Default is True. If false, Download option will be off.
</td>
</tr>
<tr>
<td>
reportfn
</td>
<td>
String OR Function, Defualt value 'twtable' then twtable will handle download options. If function, the function will be called on download option click. 
</td>
</tr>
<tr>
<td>
reportOption
</td>
<td>
Array, Array of type of report you want to have download options. Defulat value is ['csv', 'excel'] (only these two type of report handled by twtable. User can have more options. But with 'reportfn' attribute as function.). 
</td>
</tr>
</table>
</td>
<td>1.6.0 + </td>
</tr>
</table>
</li>
</ul>

<br/>
<br/>

## Server Side Pagination

### Twtable tag

```html
<TWTable
  headers="{headers}"
  data="{getdata}"
  filter="{true}"
  pagination="{true}"
  pageSize="{4}"
  heading="Demo Table"
  serversidePagination="{true}"
/>
```

'data' will be a function

```javascript
const getdata = async (twtrequest) => {
  var data = await axios.post(
    "http://yourwebsite.com/api/employee/info",
    twtrequest
  );

  var res = {
    data: data.data.empdata, // Data type Array
    recordCount: 40, // Total record count
  };

  return res;
};
```

'twtrequest' Strucure

```json
{
  "pageSize": 10,
  "currentpage": 1, // For fist page currentpage will be 0
  "userfilters": { "name": "Ashish", "designation": "developer" },
  "arrangement": { "column": "name", "order": "asc" }
}
```

## Sever-side pagination example

Website Link: https://ashishtondon.github.io/twtable-serversidepaging-demo/

Source Code: https://github.com/AshishTondon/twtable-serversidepaging-demo

<a href="https://codesandbox.io/s/eloquent-snow-5o0y7?fontsize=14&hidenavigation=1&theme=dark">
  <img alt="Edit 5o0y7" src="https://codesandbox.io/static/img/play-codesandbox.svg">
</a>

## To Do List

<table border=1 width=100%>
<tr>
<th>
Functionality
</th>
<th>
Work Status
</th>
</tr>
<tr>
<td>
Server side Pagination
</td>
<td>
In Progress
</td>
</tr>
<tr>
<td>
Table Style
</td>
<td>
TO DO
</td>
</tr>
<tr>
<td>
Convert html table to twtable
</td>
<td>
TO DO
</td>
</tr>
<tr>
<td>
user defined field for sleep time before sending out request to server on keystroke in server side pagination. Functionlity will contol request to be sent to server after each keystroke. 
</td>
<td>
TO DO
</td>
</tr>
</table>
