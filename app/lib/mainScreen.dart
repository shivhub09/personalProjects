import 'package:flutter/material.dart';
import 'package:awesome_bottom_bar/awesome_bottom_bar.dart';
import 'package:app/screens/form/PromoterDetailsPage.dart';
import 'package:app/screens/profile/Profile.dart';

class MainScreenPage extends StatefulWidget {
  final String promoterId;
  const MainScreenPage({required this.promoterId});

  @override
  State<MainScreenPage> createState() => _MainScreenPageState();
}

const List<TabItem> items = [
  TabItem(
    icon: Icons.home_rounded,
  ),
  TabItem(
    icon: Icons.person,
  ),
];

class _MainScreenPageState extends State<MainScreenPage> {
  late PageController _pageController;
  int visit = 0;
  late List<Widget> screen;

  @override
  void initState() {
    super.initState();
    _pageController = PageController(initialPage: visit);

    // Initialize screen list here
    screen = [
      PromoterDetailsPage(promoterId: widget.promoterId),
      Profile(promoterId: widget.promoterId),
    ];
  }

  @override
  void dispose() {
    _pageController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: PageView.builder(
        controller: _pageController,
        itemCount: items.length,
        onPageChanged: (index) {
          setState(() {
            visit = index;
          });
        },
        itemBuilder: (context, index) {
          return screen[index];
        },
      ),
      bottomNavigationBar: Container(
        padding: const EdgeInsets.only(bottom: 20, right: 20, left: 20),
        child: Container(
          margin: EdgeInsets.all(0),
          padding: EdgeInsets.all(0),
          decoration: BoxDecoration(
            gradient: LinearGradient(
              colors: [Colors.grey.shade900, Colors.black],
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
            ),
            boxShadow: [
              BoxShadow(
                color: Colors.grey.shade400,
                spreadRadius: 2,
                blurRadius: 4,
                offset: Offset(0, 4),
              ),
            ],
            borderRadius: BorderRadius.circular(20),
          ),
          child: BottomBarFloating(
            items: items,
            backgroundColor: Colors.transparent,
            color: Colors.grey.shade700,
            colorSelected: Color.fromRGBO(204, 195, 226, 1),
            indexSelected: visit,
            paddingVertical: 24,
            onTap: (int index) {
              _pageController.animateToPage(
                index,
                duration: Duration(milliseconds: 300),
                curve: Curves.easeInOut,
              );
            },
            animated: true,
          ),
        ),
      ),
    );
  }
}
