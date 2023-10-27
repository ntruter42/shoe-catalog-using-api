### Styling Class Names (in order):

flex
	( row | col )
	( s-gap | gap | b-gap )
	wrap
	( center | between | even | start | end )
	middle
( s-pad | pad | b-pad )
( s-h-pad | h-pad | b-h-pad )
( s-w-pad | w-pad | b-w-pad )
( s-mar | mar | b-mar )
( l-text | c-text | r-text)
( s-text | b-text )
( h-[1-10] | h-[15-95] )
( w-[1-10] | w-[15-95] )
mh-[1-20]
mw-[1-20]
relative
view

( p-fg | s-fg | t-fg )
( p-bg | s-bg | t-bg )
( p-bd-[1-10] | s-bd-[1-10] | t-bd-[1-10] )
( r-out | g-out | b-out | y-out | c-out | m-out )

{unique identifier}



# Examples:

<body class="flex col b-gap view p-bg">
	<nav class="flex row between middle w-pad h-1 mh-4">
		<a href="#" class="flex start l-text h-1 w-3">Home</a>
		<a href="#" class="flex center c-text h-1 w-3">Dashboard</a>
		<a href="#" class="flex end r-text h-1 w-3">Sign In</a>
	</nav>
</body>

<div class="flex col gap">
	<span class="w-1"></span>
</div>