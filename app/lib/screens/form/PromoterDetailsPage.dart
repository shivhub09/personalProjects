import 'package:app/screens/attendance/AttendanceWidget.dart';
import 'package:app/screens/attendance/MarkYourAttendancePage.dart';
import 'package:app/screens/attendance/ViewAttendance.dart';
import 'package:app/screens/form/FormAllFormsPage.dart';
import 'package:app/screens/profile/Profile.dart';
import 'package:app/utils/MainPageBox/MainPageBoxOne.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class PromoterDetailsPage extends StatefulWidget {
  final String promoterId;
  const PromoterDetailsPage({super.key, required this.promoterId});

  @override
  _PromoterDetailsPageState createState() => _PromoterDetailsPageState();
}

class _PromoterDetailsPageState extends State<PromoterDetailsPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      appBar: AppBar(
        title: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Flexible(
              child: Text(
                "Hi, Promoter!",
                style: GoogleFonts.poppins(
                  fontSize: 24,
                  color: Colors.white,
                  fontWeight: FontWeight.w600,
                ),
                overflow: TextOverflow.ellipsis,
              ),
            ),
            GestureDetector(
              onTap: () {
                Navigator.push(
                    context,
                    MaterialPageRoute(
                        builder: (context) =>
                            Profile(promoterId: widget.promoterId)));
              },
              child: Icon(
                Icons.person,
                color: Color.fromARGB(255, 116, 116, 116),
                size: 25,
              ),
            ),
          ],
        ),
        automaticallyImplyLeading: false,
        backgroundColor: Colors.black,
      ),
      body: LayoutBuilder(
        builder: (context, constraints) {
          double width = constraints.maxWidth;
          double boxHeight = width > 600 ? 120 : 100;
          double spacing = width > 600 ? 30 : 20;

          return Container(
            margin: const EdgeInsets.all(20),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: <Widget>[
                Column(
                  children: [
                    const SizedBox(height: 15),
                    GestureDetector(
                      onTap: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => MarkYourAttendancePage(
                                promoterId: widget.promoterId),
                          ),
                        );
                      },
                      child: AttendanceWidget(),
                    ),
                    SizedBox(height: spacing),
                    Row(
                      crossAxisAlignment: CrossAxisAlignment.center,
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        GestureDetector(
                          onTap: () {
                            Navigator.push(
                              context,
                              MaterialPageRoute(
                                builder: (context) => Formallformspage(
                                    promoterId: widget.promoterId),
                              ),
                            );
                          },
                          child: Mainpageboxone(
                            title: "View Forms",
                            icon: Icons.view_agenda_outlined,
                          ),
                        ),
                        GestureDetector(
                          onTap: () => {
                            Navigator.push(
                                context,
                                MaterialPageRoute(
                                    builder: (context) => ViewAttendancePage(
                                          promoterId: widget.promoterId,
                                        )))
                          },
                          child: Mainpageboxone(
                            title: "Attendance",
                            icon: Icons.calendar_month_outlined,
                          ),
                        ),
                      ],
                    ),
                    SizedBox(height: spacing),
                  ],
                ),
                Image.asset(
                  'assets/SAND 1 logo.png',
                  height: width > 600 ? 35 : 25,
                ),
              ],
            ),
          );
        },
      ),
    );
  }
}
