# twtable
Reactjs table module

### Why to use twtable module ?
<ul>
<li>
Pagination
</li>
<li>
Search filter
</li>
<li>
Download option excel, csv, pdf
</li>
<li>
support custom styling
</li>
</ul>

### Steps to configure twtable in project
<ul>
<li>
Import twttable in project repository

```javascript
import TWTable from "@twister19/twtable";
```
</li>
<li>
Adding table view

```html
<TWTable headers={headers} data={data} filter={true} pagination={true} pageSize={4} heading="Demo Table"/>
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

*NOTE: There can be multiple button type columns in a table*
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
</li>
</ul>
</li>

<li>TWTable tag attributes

<table border=1 width=100% style="margin:10px 0;">
<tr>
<th width="20%">Attribute</th>
<th width=10%>Require</th>
<th>Describtion</th>
</tr>
<tr>
<td>headers</td>
<td>true</td>
<td>Json, As described in above point</td>
</tr>
<tr>
<td>data</td>
<td>true</td>
<td>Json, As described in above point</td>
</tr>
<tr>
<td>pagination</td>
<td>false</td>
<td>Boolean, defualt value false. True for adding pagination in table</td>
</tr>
<tr>
<td>filter</td>
<td>false</td>
<td>Boolean, defualt value false. True for adding serach box in table.</td>
</tr>
<tr>
<td>tableClass</td>
<td>false</td>
<td>String, Can add custom CSS to table using classes</td>
</tr>
<tr>
<td>serversidePagination</td>
<td>false</td>
<td>Boolean, if true table will fetch data from API</td>
</tr>
<tr>
<td>defaultstyle</td>
<td>false</td>
<td>Boolean, Default value true. If false twtable will include default css</td>
</tr>
<tr>
<td>heading</td>
<td>false</td>
<td>String, Table heading</td>
</tr>
<tr>
<td>pageoption</td>
<td>false</td>
<td>Array, array of number</td>
</tr>
</table>
</li>
</ul>

<br/>
<br/>

## Server Side Pagination

### Twtable tag
```html
<TWTable headers={headers} data={getdata} filter={true} pagination={true} pageSize={4} heading="Demo Table" serversidePagination={true}/>
```

'data' will be a function

```javascript
    const getdata = async(twtrequest) =>{

    var data = await axios.post("http://yourwebsite.com/api/employee/info",twtrequest);

    var res = {
      data: data.data.empdata, // Data type Array
      recordCount: 40   // Total record count
    }

    return(res);
  }
```
'twtrequest' Strucure
```json
{
    "pageSize": 10, 
    "currentpage": 1,  // For fist page currentpage will be 0
    "userfilters": {"name":"Ashish", "designation":"developer"},
    "arrangement": {"column":"name", "order":"asc"}
}
```

## Sever-side pagination example
Website Link: https://ashishtondon.github.io/twtable-serversidepaging-demo/

Source Code: https://github.com/AshishTondon/twtable-serversidepaging-demo



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